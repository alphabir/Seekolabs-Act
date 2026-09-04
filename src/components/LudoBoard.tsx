import React, { useEffect, useRef, useState } from 'react';

/**
 * The live Ludo Apex board, embedded in the homepage.
 *
 * It loads /ludo-apex/scene.js at runtime rather than importing three.js into this bundle.
 * That keeps ONE implementation of the board — the Ludo product page and this spotlight
 * run the same file — and keeps ~600 KB of three.js out of the main chunk. The bare
 * `three` specifier inside scene.js resolves through the import map in index.html.
 *
 * Three things it deliberately will not do:
 *
 *  · Load on a phone. The board is 2 MB of vendored three.js and mobile visitors are the
 *    most likely to leave over it. Below the breakpoint they get the still poster and a
 *    link to the full page instead.
 *  · Load before it is needed. Nothing is fetched until the section is near the viewport.
 *  · Leak. WebGL contexts are not garbage collected with their JS objects, and a browser
 *    keeps only about sixteen alive before it starts killing the oldest — which breaks a
 *    canvas somewhere else on the page, far from the cause. The scene returns dispose()
 *    and this component always calls it.
 */

interface LudoBoardProps {
  /** Below this viewport width the board is not loaded at all. */
  minWidth?: number;
  className?: string;
}

type Scene = { dispose?: () => void };

/**
 * Typed as `string`, not left as a literal, on purpose. TypeScript tries to resolve a
 * literal specifier at compile time and fails, because this file is served from public/
 * and has no module graph entry. Widening the type makes it a runtime URL, which is what
 * it actually is — the import map in index.html resolves the `three` inside it.
 */
const SCENE_URL: string = '/ludo-apex/scene.js';

export const LudoBoard: React.FC<LudoBoardProps> = ({ minWidth = 1024, className = '' }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // StrictMode mounts effects twice in development. Without this flag the second mount
    // starts a scene the first mount's cleanup has already decided to throw away, and the
    // canvas from the discarded one is left behind.
    let cancelled = false;
    let scene: Scene | null = null;

    const gl = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
      } catch {
        return false;
      }
    })();

    if (!gl || window.innerWidth < minWidth) return;

    // Reduced motion still gets the board, just not animated. Reduced motion means less
    // movement, not less content.
    const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const cpu = navigator.hardwareConcurrency || 4;
    const tier = mem <= 2 || cpu <= 4 ? 'low' : mem <= 4 ? 'mid' : 'high';

    const start = async () => {
      try {
        const mod = await import(/* @vite-ignore */ SCENE_URL);
        if (cancelled) return;
        scene = await mod.start(host, tier, motion);
        if (cancelled) {
          scene?.dispose?.();
          scene = null;
          return;
        }
        setLive(true);
      } catch (err) {
        // A failed board costs the visitor nothing: the poster underneath still reads.
        console.warn('[seekolabs] Ludo board unavailable:', err);
      }
    };

    const MARGIN = 300;
    const near = () => {
      const r = host.getBoundingClientRect();
      return r.top < window.innerHeight + MARGIN && r.bottom > -MARGIN;
    };

    // Nothing is fetched until the board is close to the viewport — but when it already
    // IS, start straight away rather than waiting to be told.
    //
    // IntersectionObserver only delivers its first callback during a rendering update, so
    // anywhere frames are throttled (a background tab, a prerender, an embedded webview,
    // a screenshot harness) that callback can be arbitrarily late or never arrive. Since
    // this board sits in the hero, the overwhelmingly common case is "already visible",
    // and measuring it directly costs one getBoundingClientRect.
    const io = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        start();
      },
      { rootMargin: `${MARGIN}px` },
    );

    if (near()) start();
    else io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
      scene?.dispose?.();
      scene = null;
    };
  }, [minWidth]);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#05070F] ${className}`}>
      {/* The poster sits underneath the canvas, so a board that never loads costs nothing. */}
      <div
        className="absolute inset-0 grid place-items-center gap-3 transition-opacity duration-700"
        style={{
          opacity: live ? 0 : 1,
          background: 'radial-gradient(80% 60% at 50% 40%, #141B33 0%, #05070F 72%)',
        }}
        aria-hidden="true"
      >
        <span
          className="w-16 h-16 rotate-45 rounded-xl border-[3px] border-[#FFE600]"
          style={{ boxShadow: '0 0 36px rgba(247,181,0,.35), inset 0 0 24px rgba(247,181,0,.15)' }}
        />
      </div>

      <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />

      {/*
        The canvas is aria-hidden and decorative, and rolling the die is a pointerdown
        raycast with no keyboard equivalent. So the badge states what the thing IS rather
        than inviting an interaction a keyboard user cannot perform.
      */}
      {live && (
        <span className="absolute bottom-3 left-3 z-10 rounded-full border border-white/10 bg-[#05070F]/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.14em] text-[#A8AEBD] backdrop-blur-sm">
          Live 3D
        </span>
      )}
    </div>
  );
};
