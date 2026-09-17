import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The pro-auth backend origin is read server-side only (route handlers under
  // src/app/api/**) - it is never exposed to the browser. See shared/api for why:
  // the browser only ever talks to this Next.js app itself (same-origin BFF),
  // which forwards authenticated requests to the backend.
  serverExternalPackages: [],
};

export default nextConfig;
