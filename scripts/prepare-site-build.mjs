import { cpSync, mkdirSync, rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/server", { recursive: true });
cpSync("out", "dist/client", { recursive: true });
cpSync("sites/worker.mjs", "dist/server/index.js");
