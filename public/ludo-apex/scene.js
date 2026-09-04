/**
 * Ludo Apex — the 3D board.
 *
 * It fills the hero, edge to edge, and the copy sits below it on a scrim. The board is
 * deliberately framed HIGH: the camera aims below it so it rides the upper part of the
 * frame and the lower part stays clear. A four-colour board behind body text is
 * unreadable at any opacity that still shows the board, so the scrim reaches solid ink
 * before the headline starts and the two never overlap.
 *
 * Deliberate choices, and why:
 *
 *  · NO LIGHTS. Gold is a runtime-generated matcap, so every material is unlit. One less
 *    shader program, no shadow maps, and gold that actually glints as the camera moves.
 *    On a mid-range phone that is the difference between 60fps and 30.
 *
 *  · THE BOARD IS A TEXTURE, not geometry. A Ludo board is 15x15 flat cells; as geometry
 *    that is ~450 quads of overdraw for something a 1024px canvas draws crisper. One
 *    plane, one draw call.
 *
 *  · INVERTED-HULL OUTLINES. Tokens and the die get a slightly larger BackSide copy in
 *    near-black. That is what makes them read as the game's own heavy-lined art instead of
 *    generic shaded geometry — the identity lives in the outline, not the shading.
 *
 *  · IT STOPS. The loop runs only while the panel is on screen and the tab is visible.
 *    A marketing page that renders 60fps forever while the visitor reads contradicts the
 *    store listing's own promise not to heat their phone.
 *
 *  · THE STAGE STAYS DARK IN LIGHT MODE, exactly like the site's own "brand identity"
 *    display card. So the scene needs no theme handling at all.
 */
import * as THREE from 'three';

const C = {
  gold: 0xF7B500, outline: 0x0A0A0C,
  red: 0xE5383B, green: 0x2BA84A, blue: 0x2D7DEF, yellow: 0xF7B500,
  boardBg: 0x11162A, cell: 0xF1F2F5,
};

const BOARD = 7;                    // board edge, world units
const CELL  = BOARD / 15;
const HALF  = BOARD / 2;

/* ---------------------------------------------------------------- matcap
   A 128px sphere-lit gradient. Cheaper than any light, and the highlight travels
   across the surface as the camera moves, which is what sells "metal". */
function matcap() {
  const s = 128, cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const g = cv.getContext('2d');
  const rad = g.createRadialGradient(s * .36, s * .30, s * .04, s * .5, s * .5, s * .52);
  rad.addColorStop(0, '#FFF4C8'); rad.addColorStop(.28, '#F7B500');
  rad.addColorStop(.72, '#9C6A05'); rad.addColorStop(1, '#241703');
  g.fillStyle = rad; g.beginPath(); g.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2); g.fill();
  // rim light along the lower-right, so edges separate from a dark ground
  const rim = g.createRadialGradient(s * .72, s * .78, s * .02, s * .5, s * .5, s * .52);
  rim.addColorStop(0, 'rgba(255,236,180,.55)'); rim.addColorStop(.5, 'rgba(255,220,140,0)');
  g.globalCompositeOperation = 'lighter'; g.fillStyle = rim;
  g.beginPath(); g.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2); g.fill();
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ---------------------------------------------------------------- board face */
function boardTexture(px) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = px;
  const g = cv.getContext('2d');
  const u = px / 15;
  const hex = n => '#' + n.toString(16).padStart(6, '0');

  g.fillStyle = hex(C.boardBg); g.fillRect(0, 0, px, px);

  const cell = (cx, cy, fill) => {
    g.fillStyle = fill; g.fillRect(cx * u, cy * u, u, u);
    g.strokeStyle = 'rgba(6,8,16,.55)'; g.lineWidth = Math.max(1, u * .055);
    g.strokeRect(cx * u, cy * u, u, u);
  };

  for (const [x, y, col] of [[0, 0, C.red], [9, 0, C.green], [9, 9, C.yellow], [0, 9, C.blue]]) {
    g.fillStyle = hex(col); g.fillRect(x * u, y * u, 6 * u, 6 * u);
    g.fillStyle = 'rgba(255,255,255,.90)';
    g.fillRect((x + .9) * u, (y + .9) * u, 4.2 * u, 4.2 * u);
    g.strokeStyle = 'rgba(6,8,16,.6)'; g.lineWidth = Math.max(1, u * .09);
    g.strokeRect((x + .9) * u, (y + .9) * u, 4.2 * u, 4.2 * u);
    for (const [dx, dy] of [[1.75, 1.75], [3.55, 1.75], [1.75, 3.55], [3.55, 3.55]]) {
      g.beginPath();
      g.arc((x + dx) * u + u * .1, (y + dy) * u + u * .1, u * .42, 0, Math.PI * 2);
      g.fillStyle = hex(col); g.fill();
      g.strokeStyle = 'rgba(6,8,16,.65)'; g.lineWidth = Math.max(1, u * .07); g.stroke();
    }
  }

  const white = hex(C.cell);
  for (let i = 0; i < 15; i++) {
    for (let j = 6; j <= 8; j++) {
      if (i >= 6 && i <= 8) continue;
      cell(i, j, white); cell(j, i, white);
    }
  }
  for (let i = 1; i <= 5; i++) {
    cell(i, 7, hex(C.red)); cell(7, i, hex(C.green));
    cell(14 - i, 7, hex(C.yellow)); cell(7, 14 - i, hex(C.blue));
  }
  cell(1, 6, hex(C.red)); cell(8, 1, hex(C.green));
  cell(13, 8, hex(C.yellow)); cell(6, 13, hex(C.blue));

  /* The centre: four triangles meeting.
     On a 15x15 board the centre is cells 6, 7 and 8 — so the block starts at 6 * u,
     not 7 * u. Starting a cell late left column 6 unpainted, showing through as a dark
     navy strip beside the triangles, and pushed the block onto column 9, which belongs
     to the track. The white cross below already skips exactly 6..8, which is what this
     has to line up with. */
  const cx = 6 * u, cy = 6 * u, s3 = 3 * u, mx = cx + s3 / 2, my = cy + s3 / 2;
  const tri = (p, col) => {
    g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(p[2], p[3]); g.lineTo(p[4], p[5]); g.closePath();
    g.fillStyle = hex(col); g.fill();
    g.strokeStyle = 'rgba(6,8,16,.6)'; g.lineWidth = Math.max(1, u * .06); g.stroke();
  };
  tri([cx, cy, cx + s3, cy, mx, my], C.green);
  tri([cx + s3, cy, cx + s3, cy + s3, mx, my], C.yellow);
  tri([cx + s3, cy + s3, cx, cy + s3, mx, my], C.blue);
  tri([cx, cy + s3, cx, cy, mx, my], C.red);

  g.strokeStyle = hex(C.gold); g.lineWidth = Math.max(2, u * .16);
  g.strokeRect(g.lineWidth / 2, g.lineWidth / 2, px - g.lineWidth, px - g.lineWidth);

  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/* ---------------------------------------------------------------- die pips */
function dieTexture(px) {
  const cv = document.createElement('canvas');
  cv.width = px * 3; cv.height = px * 2;                   // 3x2 atlas, faces 1..6
  const g = cv.getContext('2d');
  const P = [[[.5, .5]], [[.28, .28], [.72, .72]], [[.26, .26], [.5, .5], [.74, .74]],
             [[.28, .28], [.72, .28], [.28, .72], [.72, .72]],
             [[.26, .26], [.74, .26], [.5, .5], [.26, .74], [.74, .74]],
             [[.28, .24], [.72, .24], [.28, .5], [.72, .5], [.28, .76], [.72, .76]]];
  for (let f = 0; f < 6; f++) {
    const ox = (f % 3) * px, oy = Math.floor(f / 3) * px;
    g.fillStyle = '#F7B500'; g.fillRect(ox, oy, px, px);
    const grd = g.createLinearGradient(ox, oy, ox, oy + px);
    grd.addColorStop(0, 'rgba(255,255,255,.22)'); grd.addColorStop(1, 'rgba(0,0,0,.16)');
    g.fillStyle = grd; g.fillRect(ox, oy, px, px);
    g.fillStyle = '#0A0A0C';
    for (const [x, y] of P[f]) {
      g.beginPath(); g.arc(ox + x * px, oy + y * px, px * .085, 0, Math.PI * 2); g.fill();
    }
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ------------------------------------------------------- contact-shadow decal
   There are no lights, so there are no real shadows. A soft radial decal under each
   piece does the whole job of grounding it for one blended quad. */
function blobTexture() {
  const s = 64, cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const g = cv.getContext('2d');
  const r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  r.addColorStop(0, 'rgba(0,0,0,.55)'); r.addColorStop(.55, 'rgba(0,0,0,.25)');
  r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r; g.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(cv);
}

/* ---------------------------------------------------------------- outline shell */
function outlined(mesh, scale = 1.05) {
  const shell = new THREE.Mesh(
    mesh.geometry,
    new THREE.MeshBasicMaterial({ color: C.outline, side: THREE.BackSide })
  );
  shell.scale.setScalar(scale);
  mesh.add(shell);
  return mesh;
}

function token(colour, goldMat, seg) {
  const grp = new THREE.Group();
  const bezel = new THREE.Mesh(new THREE.CylinderGeometry(.5, .52, .16, seg), goldMat);
  outlined(bezel, 1.07);
  grp.add(bezel);

  const face = new THREE.Mesh(
    new THREE.CylinderGeometry(.355, .355, .19, Math.max(16, seg - 4)),
    new THREE.MeshBasicMaterial({ color: colour }));
  face.position.y = .015;
  grp.add(face);

  const mark = new THREE.Mesh(new THREE.BoxGeometry(.17, .02, .17),
    new THREE.MeshBasicMaterial({ color: 0xffffff }));
  mark.position.y = .115; mark.rotation.y = Math.PI / 4;
  grp.add(mark);
  return grp;
}

/* ================================================================= start */
export async function start(host, tier = 'high', motion = true) {
  // motion=false is prefers-reduced-motion. It silences the idle sway, the token bob and the
  // roll on load — but it still builds and renders the board. Reduced motion means no motion,
  // not no content, and an empty panel is a worse answer than a still one.
  const Q = {
    low:  { dpr: 1.0, board: 512,  seg: 20 },
    mid:  { dpr: 1.5, board: 1024, seg: 32 },
    high: { dpr: 2.0, board: 1024, seg: 40 },
  }[tier] || { dpr: 1.5, board: 1024, seg: 32 };

  const renderer = new THREE.WebGLRenderer({
    antialias: tier !== 'low', alpha: true, powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, Q.dpr));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  /* setSize(w, h, false) below writes only the canvas's width/height ATTRIBUTES, which are
     host pixels times the device pixel ratio. Without a CSS size the browser lays a canvas
     out at its attribute size in CSS pixels, so on any display with dpr > 1 it renders
     dpr times too large and its host clips it — the visitor sees the top-left corner of
     the board, magnified. The standalone Ludo page never showed this because site.css
     carries an `#stage canvas { width:100%!important; height:100%!important }` rule; a
     React host has no such rule. Setting it here fixes every consumer at once. */
  Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });

  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const world = new THREE.Group();               // everything that sways
  scene.add(world);
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 200);

  const goldMat = new THREE.MeshMatcapMaterial({ matcap: matcap() });
  const blob = blobTexture();
  // One material per decal, because each one fades independently as its piece lifts.
  const blobMat = () => new THREE.MeshBasicMaterial({
    map: blob, transparent: true, depthWrite: false,
  });

  /* ---------------- board ---------------- */
  const board = new THREE.Mesh(new THREE.PlaneGeometry(BOARD, BOARD),
    new THREE.MeshBasicMaterial({ map: boardTexture(Q.board) }));
  board.rotation.x = -Math.PI / 2;
  world.add(board);

  // a thin gold slab under the face, so the board reads as an object not a decal
  const rim = new THREE.Mesh(new THREE.BoxGeometry(BOARD + .3, .22, BOARD + .3), goldMat);
  rim.position.y = -.13;
  outlined(rim, 1.012);
  world.add(rim);

  /* ---------------- tokens ---------------- */
  const at = (cx, cy) => new THREE.Vector3(-HALF + (cx + .5) * CELL, .14, -HALF + (cy + .5) * CELL);
  const toks = [[1, 6, C.red], [8, 1, C.green], [13, 8, C.yellow], [6, 13, C.blue]]
    .map(([x, y, col], i) => {
      const t = token(col, goldMat, Q.seg);
      t.position.copy(at(x, y));
      t.scale.setScalar(.62);
      t.userData.phase = i * 1.7;               // so they do not all bob in lockstep
      t.userData.baseY = t.position.y;
      world.add(t);

      const sh = new THREE.Mesh(new THREE.PlaneGeometry(.95, .95), blobMat());
      sh.rotation.x = -Math.PI / 2;
      sh.position.set(t.position.x, .012, t.position.z);
      world.add(sh);
      t.userData.shadow = sh;
      return t;
    });

  /* ---------------- die ---------------- */
  const die = new THREE.Mesh(new THREE.BoxGeometry(.78, .78, .78),
    new THREE.MeshBasicMaterial({ map: dieTexture(256) }));
  {                                              // per-face UVs into the 3x2 atlas
    const uv = die.geometry.attributes.uv;
    for (let f = 0; f < 6; f++) {
      const cx = (f % 3) / 3, cy = 1 - Math.floor(f / 3 + 1) / 2;
      for (let k = 0; k < 4; k++) {
        const i = f * 4 + k;
        uv.setXY(i, cx + uv.getX(i) / 3, cy + uv.getY(i) / 2);
      }
    }
    uv.needsUpdate = true;
  }
  const DIE_REST = .62;
  die.position.set(2.05, DIE_REST, 2.05);
  outlined(die, 1.06);
  world.add(die);

  const dieShadow = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), blobMat());
  dieShadow.rotation.x = -Math.PI / 2;
  dieShadow.position.set(die.position.x, .014, die.position.z);
  world.add(dieShadow);

  /* ---------------- framing ------------------------------------------------
     Fit the camera to the board's SWEPT silhouette: its corners rotated through
     the range the sway actually covers, and no further.

     Fitting a full 360-degree ring instead (the obvious move) frames for the
     board's diagonal rather than its edge — 41% wider than anything that is ever
     on screen — and the board then sits marooned in the middle of the panel. The
     sway never exceeds SWEEP, so neither does the fit.                        */
  const SWAY = .17;          // amplitude of the idle oscillation, radians
  const PARALLAX = .10;      // extra yaw the pointer can add, radians
  const SWEEP = SWAY + PARALLAX;
  const DIE_HOP = .9;

  // Two sets, and the difference between them is the whole reason the board kept sliding
  // under the scrim:
  //   FIT_SWEPT  every pose the sway passes through. Bounds the WIDTH.
  //   FIT_REST   the pose it actually sits in. Places it VERTICALLY.
  // Solving the vertical window against the swept set pins the board's most extreme
  // corner to the top of the frame, which leaves it sitting low and long at rest, with
  // its bottom edge below the copy — where the scrim paints over it.
  const FIT_REST = [];
  const FIT_POINTS = (() => {
    const pts = [];
    const e = (BOARD + .3) / 2;                       // rim half-edge
    for (let i = 0; i <= 6; i++) {
      const th = -SWEEP + (i / 6) * SWEEP * 2;
      const c = Math.cos(th), s = Math.sin(th);
      for (const [x, z] of [[e, e], [e, -e], [-e, e], [-e, -e]]) {
        for (const y of [-.25, .06]) {
          const p = new THREE.Vector3(x * c + z * s, y, -x * s + z * c);
          pts.push(p);
          if (th === 0) FIT_REST.push(p);
        }
      }
      // The die AT REST, so it is always fully on screen. Its hop is deliberately not
      // reserved: the die sits at the front of the board, low in frame, and reserving the
      // top of its arc costs a third of the hero for one second of animation.
      const dh = .78 * 1.06 / 2;
      for (const [x, z] of [[2.05 + dh, 2.05 + dh], [2.05 - dh, 2.05 - dh]]) {
        const p = new THREE.Vector3(x * c + z * s, DIE_REST + dh, -x * s + z * c);
        pts.push(p);
        if (th === 0) FIT_REST.push(p);
      }
    }
    return pts;
  })();

  const TARGET = new THREE.Vector3(0, .15, 0);

  // Two view directions, interpolated by how far you have scrolled into the hero. A is a
  // raised three-quarter view on arrival; B drops and swings left as the copy comes up, so
  // the board turns away rather than just sliding off the top.
  const DIR_A = new THREE.Vector3(0, .78, .63).normalize();
  const DIR_B = new THREE.Vector3(-.34, .50, .80).normalize();
  const DIR = DIR_A.clone();          // the live direction, rebuilt every frame
  let radius = 14;

  /* How far up the frame the board is pushed, in normalised device coordinates. Applied
     as a FRUSTUM OFFSET, not by aiming the camera lower.

     Aiming lower looks equivalent and is not. It rotates the camera, and a rotation of
     ~16 degrees — which is what this lift needs — is not a translation in NDC: it changes
     the board's apparent tilt and its projected size, so the board lands nowhere near
     where the solve put it. camera.setViewOffset shifts the frustum itself, which IS an
     exact NDC translation, and leaves the perspective untouched. */
  let LIFT = .4;

  /* HERO mode has copy below the board to stay clear of; CONTAINED mode is a plain box
     with nothing in it, so the board simply fills the frame. Detected from the DOM rather
     than passed in, so the same file drives the Ludo hero and the homepage spotlight with
     no caller having to know which it is. */
  const heroMode = !!(host.closest('.hero') && document.querySelector('.hero-copy'));

  /* Where the copy block starts, as a fraction of the host's height. MEASURED, because
     the headline wraps to three lines on a phone and two on a desktop, and a guessed
     constant puts the board through the text on whichever one it was not tuned for. */
  function copyTop() {
    if (!heroMode) return 1;                 // nothing to avoid: use the whole box
    const r = host.getBoundingClientRect();
    const el = document.querySelector('.hero-copy');
    if (!el || !r.height) return .55;
    // The floor is a guard against a degenerate zero, nothing more. It must stay BELOW any
    // real value: clamping up to a comfortable-looking 0.32 put the scrim's solid edge
    // below the headline on a short window, which is precisely the failure it exists to
    // prevent. Trust the measurement.
    return Math.min(.9, Math.max(.14, (el.getBoundingClientRect().top - r.top) / r.height));
  }

  function fit() {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    // Re-read the pixel ratio here, not once at start-up: the window can move to a
    // display with a different one, and a canvas left at ratio 1 on a 1.5x screen is
    // visibly soft.
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, Q.dpr));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // A tall narrow viewport fits the board on width, so the auto-fit pushes the camera
    // far back and the perspective goes flat. Widening the lens as it narrows pulls the
    // camera in again and keeps the board looking like an object with depth.
    camera.fov = Math.min(54, 32 + (1 - Math.min(1, camera.aspect)) * 26);
    camera.updateProjectionMatrix();

    // The vertical window the board has to land in: from a sliver off the top edge down
    // to just above where the copy begins.
    const stop = copyTop();
    // The WHOLE board, top edge just inside the frame. Cropping it looked dramatic in
    // isolation and simply looked broken in place: you saw a horizontal slice of a board
    // and could not tell what it was. A shade under 1 leaves the sway a little headroom,
    // since a swaying corner rides slightly higher than the resting one.
    // Contained mode centres instead of hugging the top: there is no copy underneath to
    // make room for, so a top-pinned board would just leave a gap below it.
    const yTop = heroMode ? .93 : .88;
    // In contained mode `stop` is 1, so this is -1: the whole frame, edge to edge.
    const yBot = 1 - 2 * (stop - .05);       // 5% of the hero as breathing room
    // NO floor here. A floor lets the board grow taller than the gap above the copy, and
    // since the scrim goes solid at the copy's top edge the overflow is not merely
    // overlapped, it is painted over — the board vanishes completely. If the window is
    // short the board is small; that is the honest answer, and it stays visible.
    // Contained mode fills the panel with a small margin; hero mode uses the measured gap.
    const wantSpan = !heroMode ? 1.88 : Math.max(.08, yTop - yBot);
    // Sideways the board MAY run past the edges — that is what makes it read as big —
    // but not without limit, and a narrow screen tolerates more of it than a wide one.
    // Contained mode gets NO bleed: a panel has visible borders, so a board running past
    // them reads as broken rather than bold.
    const xBleed = !heroMode ? 1 : (camera.aspect < 1 ? 1.5 : 1.18);

    // Solve the distance for that vertical span. Measure with no lift: shifting the aim
    // moves the board bodily, so the SPAN is independent of it and the two solve cleanly
    // one after the other rather than chasing each other.
    let d = 16, lo = 0, hi = 0;
    const measure = () => {
      camera.clearViewOffset();                    // solve in the unshifted frame
      camera.position.copy(DIR_A).multiplyScalar(d).add(TARGET);
      camera.lookAt(TARGET);
      camera.updateMatrixWorld();
      lo = Infinity; hi = -Infinity;
      for (const p of FIT_REST) {                  // vertical window: the resting pose
        const v = p.clone().project(camera);
        if (v.y < lo) lo = v.y;
        if (v.y > hi) hi = v.y;
      }
      let xMax = 0;
      for (const p of FIT_POINTS) {                // width: every pose the sway reaches
        xMax = Math.max(xMax, Math.abs(p.clone().project(camera).x));
      }
      return Math.max((hi - lo) / wantSpan, xMax / xBleed);
    };
    for (let i = 0; i < 12; i++) {
      const k = measure();
      if (!isFinite(k) || k <= 0) break;
      d *= k;
      if (Math.abs(k - 1) < .004) break;
    }
    measure();                               // final pass, so `hi` matches the final d

    radius = d;
    // Hero mode pins the board's top edge to yTop so the copy below has room. Contained
    // mode has nothing to make room for, so it centres: pinning the top there just left a
    // gap under the board.
    LIFT = heroMode ? yTop - hi : -(hi + lo) / 2;
    // y is measured downward from the top of the virtual frame, so a positive offset
    // reveals a lower slice of the scene and the board rides up by exactly LIFT.
    camera.setViewOffset(w, h, 0, LIFT * h / 2, w, h);
    camera.updateMatrixWorld();

    // Drive the scrim from the SAME solve, so the two can never disagree.
    //   --scrim-from  where the darkening starts: just under the board's bottom edge.
    //   --scrim-stop  where it is fully solid: exactly where the copy begins.
    // Starting the fade higher than the board's bottom is what turned the board into a
    // washed-out horizontal band with the die lost inside it.
    if (heroMode) {
      const bottom = (1 - (lo + LIFT)) / 2;  // board's lowest point, as a page fraction
      const from = Math.max(.10, Math.min(stop - .02, bottom - .01));
      const st = document.documentElement.style;
      st.setProperty('--scrim-from', (from * 100).toFixed(1) + '%');
      st.setProperty('--scrim-stop', (stop * 100).toFixed(1) + '%');
    }

    dirty = true;
  }

  /* ---------------- loop ---------------- */
  let raf = 0, dirty = true, running = false, t0 = 0, clockMs = 0, scrollT = 0;
  const pointer = new THREE.Vector2();
  const UP = new THREE.Vector3(0, 1, 0);
  let anim = null;

  function frame(now) {
    raf = 0;
    if (!t0) t0 = now;
    const dt = Math.min(.05, (now - t0) / 1000);       // clamp, so a stalled tab cannot jump
    t0 = now;
    clockMs += dt;

    if (motion) {
      // sway: a slow oscillation, not a turntable. A full spin reads as a screensaver.
      world.rotation.y = Math.sin(clockMs * .28) * SWAY + pointer.x * PARALLAX;
      world.rotation.x = Math.sin(clockMs * .21) * .022;

      // tokens breathe
      for (const t of toks) {
        const k = Math.sin(clockMs * 1.15 + t.userData.phase);
        t.position.y = t.userData.baseY + (k * .5 + .5) * .07;
        const lift = t.position.y - t.userData.baseY;
        t.userData.shadow.scale.setScalar(1 - lift * 1.4);
        t.userData.shadow.material.opacity = 1 - lift * 3.2;
      }
    }

    let busy = false;
    if (anim) { busy = anim(dt); if (!busy) anim = null; }

    // Camera: interpolate the two keyframes by scroll, then add pointer parallax, then
    // ease toward it so nothing ever snaps.
    // Contained mode holds DIR_A. fit() solves the framing for DIR_A alone, and contained
    // mode allows no horizontal bleed, so swinging the camera toward DIR_B on scroll would
    // push the board past the panel edge that the fit was built to respect.
    DIR.copy(DIR_A).lerp(DIR_B, heroMode ? scrollT : 0).normalize();
    const d = radius * (1 - (heroMode ? scrollT : 0) * .10);   // creep in as you scroll
    const target = DIR.clone()
      .applyAxisAngle(UP, motion ? pointer.x * .14 : 0)
      .multiplyScalar(d).add(TARGET);
    if (motion) target.y += -pointer.y * d * .08;
    camera.position.lerp(target, .08);
    camera.lookAt(TARGET);

    dieShadow.position.set(die.position.x, .014, die.position.z);
    const hi = Math.max(0, die.position.y - DIE_REST);
    dieShadow.scale.setScalar(1 + hi * .40);
    dieShadow.material.opacity = Math.max(.15, 1 - hi * .55);

    renderer.render(scene, camera);

    // Keep going while anything is moving. With motion on, the sway always is — so this
    // runs whenever the panel is on screen and stops the moment it is not. With motion off
    // there is nothing to animate, so it renders once and sleeps until something asks.
    if (running && motion) request();
    else if (busy || dirty) { dirty = false; request(); }
  }

  const request = () => { if (!raf) raf = requestAnimationFrame(frame); };
  // A rAF scheduled while the document is hidden may NEVER fire, and `raf` then stays set
  // forever — every later request() is a silent no-op and the scene is dead even once the
  // tab comes back. Unstick it explicitly rather than trusting the callback to arrive.
  const unstick = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } t0 = 0; request(); };

  function setRunning(on) {
    if (on === running) return;
    running = on;
    if (on) unstick();
    else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  /* ---------------- the roll ---------------- */
  // Rotation that puts face n on top. BoxGeometry emits faces in the order
  // +X, -X, +Y, -Y, +Z, -Z, and the UV remap above lays the atlas over them in that same
  // order — so the pip counts are +X=1, -X=2, +Y=3, -Y=4, +Z=5, -Z=6. Face 2 is therefore
  // -X and needs a turn about Z; face 6 is -Z and needs a turn about X. Getting those two
  // the wrong way round is silent: the die still tumbles and still lands flat, it just
  // shows a two while the page says six.
  const FACE_ROT = [
    [0, 0, Math.PI / 2], [0, 0, -Math.PI / 2], [0, 0, 0],
    [Math.PI, 0, 0], [-Math.PI / 2, 0, 0], [Math.PI / 2, 0, 0],
  ];
  let rolling = false;

  function roll(face) {
    if (rolling) return;
    rolling = true;
    // Lands on a six by default: sixes are what let you leave the yard, and the copy owns it.
    const f = face || 6;
    // FACE_ROT is an ABSOLUTE orientation, measured from identity, so the target has to be
    // built from identity too. Adding it to the die's current rotation composes the two
    // instead of replacing it, and because the whole-turn terms are exact multiples of 2*PI
    // they cancel rather than washing the error out — the landing face then drifts on every
    // roll (6, 4, 5, 3, ...). Wrapping `from` into [0, 2*PI) is orientation-preserving, so
    // there is no snap on the first frame, and it keeps a repeated roll actually spinning.
    const TAU = Math.PI * 2;
    const wrap = a => a - Math.floor(a / TAU) * TAU;
    const from = new THREE.Euler(wrap(die.rotation.x), wrap(die.rotation.y), wrap(die.rotation.z));
    const to = new THREE.Euler(
      Math.PI * 4 + FACE_ROT[f - 1][0],
      Math.PI * 2,
      Math.PI * 2 + FACE_ROT[f - 1][2]);
    let e = 0; const dur = 1.05;
    anim = dt => {
      e += dt;
      const k = Math.min(1, e / dur);
      const s = 1 - Math.pow(1 - k, 3);                          // ease-out cubic
      die.rotation.set(from.x + (to.x - from.x) * s,
                       from.y + (to.y - from.y) * s,
                       from.z + (to.z - from.z) * s);
      die.position.y = DIE_REST + Math.sin(k * Math.PI) * DIE_HOP;  // one heavy parabola
      if (k >= 1) { die.position.y = DIE_REST; rolling = false; }
      return k < 1;
    };
    request();
  }

  // Every listener and observer is captured so dispose() can undo it. A scene that cannot
  // be torn down leaks a WebGL context on each React unmount, and browsers keep only about
  // sixteen alive before they start dropping the oldest — which kills a scene somewhere
  // else on the page, far from the cause.
  const cleanups = [];
  const on = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    cleanups.push(() => target.removeEventListener(type, fn, opts));
  };

  const btn = host.closest('section')?.querySelector('#roll') || document.getElementById('roll');
  if (btn) on(btn, 'click', () => roll(6));

  /* ---------------- input ---------------- */
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const localPointer = e => {
    const r = renderer.domElement.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1)];
  };

  on(renderer.domElement, 'pointerdown', e => {
    const [x, y] = localPointer(e);
    ndc.set(x, y);
    ray.setFromCamera(ndc, camera);
    // Clicking the die itself rolls it — the affordance people reach for first.
    if (ray.intersectObject(die, false).length) roll(6);
  });

  if (matchMedia('(pointer: fine)').matches) {
    // The hand cursor over the die still applies with motion off; only the parallax stops.
    on(renderer.domElement, 'pointermove', e => {
      const [x, y] = localPointer(e);
      pointer.set(x, -y);
      // Only the die is clickable, so only the die gets the hand cursor. One raycast
      // against one box is far cheaper than the frame it happens inside.
      ndc.set(x, y);
      ray.setFromCamera(ndc, camera);
      renderer.domElement.style.cursor = ray.intersectObject(die, false).length ? 'pointer' : '';
    }, { passive: true });
    on(renderer.domElement, 'pointerleave', () => pointer.set(0, 0));
  }
  renderer.domElement.style.touchAction = 'pan-y';   // never eat a vertical scroll

  // 0 at the top of the hero, 1 once it has scrolled a full screen. Read from the host's
  // own box rather than scrollY, so it stays correct whatever sits above the hero.
  function readScroll() {
    const r = host.getBoundingClientRect();
    const span = Math.max(1, r.height * .85);
    const t = Math.min(1, Math.max(0, -r.top / span));
    if (Math.abs(t - scrollT) > .001) { scrollT = t; return true; }
    return false;
  }
  on(window, 'scroll', () => { if (readScroll()) { dirty = true; if (!running) unstick(); } },
    { passive: true });

  /* ---------------- lifecycle ----------------
     Two gates, both required: the panel has to be on screen AND the tab visible. */
  let onScreen = true;
  const sync = () => setRunning(onScreen && !document.hidden);

  // Always re-arm after a resize. With motion off the loop is asleep even while `running`
  // is true, so testing `running` here would recompute the fit and then never repaint it.
  const ro = new ResizeObserver(() => { fit(); unstick(); });
  ro.observe(host);
  const io = new IntersectionObserver(es => { onScreen = es[0].isIntersecting; sync(); },
    { threshold: 0 });
  io.observe(host);
  cleanups.push(() => { ro.disconnect(); io.disconnect(); });
  on(document, 'visibilitychange', sync);

  // `tick` drives one real frame. Verification tools often run where requestAnimationFrame
  // is throttled to nothing, and rendering directly with renderer.render() there measures
  // a camera that the loop has not moved yet — which reads as a framing bug that is not.
  window.__ludo = {
    renderer, scene, camera, roll,
    tick: () => frame(performance.now()),
    get info() { return renderer.info.render; },
  };

  fit();
  readScroll();
  camera.position.copy(DIR_A).multiplyScalar(radius).add(TARGET);
  camera.lookAt(TARGET);

  // Paint ONE frame synchronously before returning. requestAnimationFrame does not fire
  // while a document is hidden (a background tab on load, a prerender, some embedded
  // webviews), and the caller clears the poster as soon as start() resolves — without this
  // the visitor would be looking at an empty canvas.
  renderer.render(scene, camera);

  sync();
  // Arrive in motion — but never unprompted for a visitor who asked for less of it.
  // A roll they start themselves, by clicking, is still allowed.
  if (motion) setTimeout(() => roll(6), 650);

  /* Free everything. GPU resources are not garbage collected with the JS objects that
     reference them, so geometries, materials and textures each need an explicit dispose;
     forceContextLoss() then releases the context itself rather than waiting for the
     browser to evict it. */
  let disposed = false;
  function dispose() {
    if (disposed) return;
    disposed = true;
    setRunning(false);
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    anim = null;
    for (const off of cleanups) off();
    cleanups.length = 0;
    scene.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      const mats = Array.isArray(o.material) ? o.material : (o.material ? [o.material] : []);
      for (const m of mats) {
        for (const k of ['map', 'matcap', 'alphaMap']) if (m[k]) m[k].dispose();
        m.dispose();
      }
    });
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    if (window.__ludo && window.__ludo.renderer === renderer) delete window.__ludo;
  }

  return { roll, renderer, scene, camera, dispose };
}
