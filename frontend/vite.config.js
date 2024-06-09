import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
<<<<<<< HEAD
        target: "http://localhost:4000/",
=======
        target: "https://onlineshopping-ruddy.vercel.app",
>>>>>>> bca60c26b866647726220ede969a0e6a28b11822
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
