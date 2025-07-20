import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⛔ Ignore les erreurs ESLint au build (ex: Vercel)
  },
  // Tu peux ajouter d'autres options ici si besoin
};

export default nextConfig;
