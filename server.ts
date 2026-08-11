import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  role: string;
  monthlyVolume: string;
  verticals: string[];
  message: string;
  createdAt: string;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory leads store
  const leads: LeadSubmission[] = [];

  // --- API ROUTES ---

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "seekolabs.tech engine", timestamp: new Date().toISOString() });
  });

  // Lead Collection Form Endpoint
  app.post("/api/contact", (req, res) => {
    const { fullName, email, companyName, role, monthlyVolume, verticals, message } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: "Name and Email are required fields." });
    }

    const newLead: LeadSubmission = {
      id: `LEAD-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      email,
      companyName: companyName || 'N/A',
      role: role || 'Advertiser / Partner',
      monthlyVolume: monthlyVolume || 'Not Specified',
      verticals: Array.isArray(verticals) ? verticals : [],
      message: message || '',
      createdAt: new Date().toISOString()
    };

    leads.push(newLead);
    console.log("New Lead Collected for Seekolabs:", newLead);

    res.status(201).json({
      success: true,
      message: "Thank you for contacting Seekolabs! Our partnership team will review your details and respond within 24 hours.",
      leadId: newLead.id
    });
  });

  // Optional endpoint to retrieve lead count (internal)
  app.get("/api/leads/count", (_req, res) => {
    res.json({ count: leads.length });
  });

  // --- VITE / PRODUCTION SERVING ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Seekolabs Engine running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

