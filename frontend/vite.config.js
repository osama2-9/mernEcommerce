import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://mern-ecommerce-rust-iota.vercel.app/",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
