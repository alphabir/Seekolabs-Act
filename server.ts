import express from "express";
import path from "path";

interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  role: string;
  message: string;
  createdAt: string;
}

// Production is opted into explicitly so the same command works on every OS.
// `npm run dev` runs this file through tsx; `npm start` runs the esbuild bundle
// with --production. NODE_ENV is still honoured for hosts that set it.
const IS_PRODUCTION =
  process.env.NODE_ENV === "production" || process.argv.includes("--production");

// Cloud Run and most PaaS hosts inject the port they expect us to listen on.
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();

  app.use(express.json());

  // In-memory leads store. Resets on restart — swap for a real datastore
  // before this endpoint is wired up to the contact section.
  const leads: LeadSubmission[] = [];

  // --- API ROUTES ---

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "seekolabs.tech",
      timestamp: new Date().toISOString(),
    });
  });

  app.post("/api/contact", (req, res) => {
    const { fullName, email, companyName, role, message } = req.body ?? {};

    if (!fullName || !email) {
      return res.status(400).json({ error: "Name and email are required fields." });
    }

    const newLead: LeadSubmission = {
      id: `LEAD-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      email,
      companyName: companyName || "N/A",
      role: role || "Not specified",
      message: message || "",
      createdAt: new Date().toISOString(),
    };

    leads.push(newLead);
    console.log("New lead collected:", newLead.id, newLead.email);

    res.status(201).json({
      success: true,
      message:
        "Thank you for contacting SeekoLabs. Our team will review your details and respond within 24 hours.",
      leadId: newLead.id,
    });
  });

  app.get("/api/leads/count", (_req, res) => {
    res.json({ count: leads.length });
  });

  // --- VITE / PRODUCTION SERVING ---
  if (!IS_PRODUCTION) {
    // Serve public/ ourselves, BEFORE Vite. Vite's own public-dir middleware does not
    // resolve a directory to its index.html, so a standalone page like
    // public/ludo-apex/index.html is reachable in dev only at its full filename —
    // "/ludo-apex/" falls through to the SPA catch-all and silently returns the React
    // shell instead. Production is fine (express.static resolves the index), so without
    // this, dev and production disagree about a URL that works. Same bytes either way.
    app.use(express.static(path.join(process.cwd(), "public")));

    // Imported lazily so Vite stays a devDependency and is never required in production.
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Express 4 catch-all. "*all" is Express 5 syntax and silently matches only
    // paths ending in "all" here, which 404s every deep link.
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `SeekoLabs ${IS_PRODUCTION ? "production" : "dev"} server running at http://0.0.0.0:${PORT}`,
    );
  });
}

startServer();
