import express from "express";
import path from "path";
import dns from "dns";
import axios from "axios";
import { createServer as createViteServer } from "vite";

// Force Node.js to use IPv4 first because the IPv6 address is being blocked by Cloudflare
dns.setDefaultResultOrder('ipv4first');

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to proxy nexusggr
  app.post("/api/nexusggr", async (req, res) => {
    try {
      let NEXUS_AGENT_TOKEN = process.env.NEXUS_AGENT_TOKEN || '7b7dabcc2a48dd209d7bbdc652af9156';
      let NEXUS_AGENT_CODE = process.env.NEXUS_AGENT_CODE || 'Jitov';
      
      // Fix if user accidentally swapped them in the UI settings (Code is short, Token is 32 chars)
      if (NEXUS_AGENT_CODE.length > 20 && NEXUS_AGENT_TOKEN.length < 20) {
        const temp = NEXUS_AGENT_CODE;
        NEXUS_AGENT_CODE = NEXUS_AGENT_TOKEN;
        NEXUS_AGENT_TOKEN = temp;
      }
      
      const { endpoint, ...restBody } = req.body;
      const payload = {
        ...restBody,
        agent_code: NEXUS_AGENT_CODE,
        agent_token: NEXUS_AGENT_TOKEN
      };

      const response = await axios.post("https://api.nexusggr.dev", payload, {
        headers: {
          "Content-Type": "application/json"
        },
        validateStatus: () => true // Resolve all status codes
      });
      
      const contentType = response.headers["content-type"];
      if (contentType && contentType.includes("application/json")) {
        res.status(response.status).json(response.data);
      } else {
        const text = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        res.status(response.status || 500).json({ error: "Invalid response from upstream API", details: text.substring(0, 100) });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
