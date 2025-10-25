import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load semua environment variables dari Docker atau .env file
  const env = loadEnv(mode, ".", "");

  // Ambil variabel dari env (kalau gak ada, fallback ke localhost)
  const proxyTarget = env.VITE_PROXY_TARGET || "http://localhost:8080";

  return {
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        "/api": proxyTarget,
      },
    },
  };
});
