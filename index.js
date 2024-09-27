import express from "express";
import { createServer } from "node:http";
import httpProxy from "http-proxy";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { join, dirname } from "node:path";
import { hostname } from "node:os";
import { fileURLToPath } from "url";
import wisp from "wisp-server-node";
import expressLayouts from "express-ejs-layouts";

const cdnProxy = httpProxy.createProxyServer();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = join(__dirname, "public");

app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "public/views"));
app.use(expressLayouts);
app.use("/stars/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

app.get("/", (req, res) => {
  res.render("index", (err, html) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.send(html);
    }
  });
});

app.use("/cdn", (req, res) => {
  cdnProxy.web(req, res, {
    target: "https://glcdn.githack.com/Thedogecraft/assets/-/raw/main/public/",
    changeOrigin: true,
  });
});

app.get("/go", (req, res) => {
  res.render("go", { layout: false });
});

app.get("/:page", (req, res) => {
  const page = req.params.page;
  res.render(page, (err, html) => {
    if (err) {
      if (err.message.includes("Failed to lookup view")) {
        res.status(404).render("404");
      } else {
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.send(html);
    }
  });
});

const server = createServer();

server.on("request", (req, res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "same-origin");
  app(req, res);
});
server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
  else socket.end();
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();

  console.log(`[+] Starting 💫 Starlight...`);
  console.log();
  console.log(`[+] Made by The Parcoil Network:`);
  console.log();
  console.warn(`[+] https://github.com/Parcoil/starlight`);
  console.log();
  console.log(`[+] Starlight Running on port ${address.port}`);
  console.log();
});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  process.exit(0);
}

server.listen({
  port,
});
