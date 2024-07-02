import { createBareServer } from "@tomphttp/bare-server-node";
import { createServer } from "node:http";
import { join } from "node:path";
import { hostname } from "node:os";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import expressLayouts from "express-ejs-layouts";
const bare = createBareServer("/bare/");

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const publicPath = join(__dirname, "public");

app.set("view engine", "ejs");
app.set("views", join(__dirname, "public/views"));
app.use(expressLayouts);
app.use(express.static(publicPath));
app.use("/stars/", express.static(uvPath));
app.use("/", express.static(path.join(__dirname, "/")));

app.get("/", (req, res) => {
  res.render("index", (err, html) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.send(html);
    }
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
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8090;

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

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({ port });
