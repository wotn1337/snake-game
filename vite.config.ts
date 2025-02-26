import dotenv from "dotenv";
import { defineConfig } from "vite";
dotenv.config();

export default defineConfig({
  server: {
    port: Number(process.env.APP_PORT),
  },
  preview: {
    port: Number(process.env.APP_PORT),
    host: process.env.APP_IP,
    allowedHosts: process.env.APP_IP ? [process.env.APP_IP] : undefined,
  },
});
