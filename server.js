import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { AuthRouter } from "./routes/auth.routes.js";
import { ProductRouter } from "./routes/products.routes.js";
import { BannerRouter } from "./routes/banners.routes.js";
import { GeneralRouter } from "./routes/general.routes.js";

const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use("/data/files", express.static(path.join(__dirname, "uploads")));

server.use(cookieParser());
server.use(express.json());

server.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);

// server.use(
//   cors({
//     origin: ["https://uaeiptvbox.net"],
//     credentials: true,
//   }),
// );

server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send(`
    <body style="background:black; color:white; font-family:monospace;">
      Node JS v24
    </body>
  `);
});

server.use("/data/admin", GeneralRouter);
server.use("/data/admin", AuthRouter);
server.use("/data/admin", ProductRouter);
server.use("/data/admin", BannerRouter);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
