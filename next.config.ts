import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        // TODO: API 연결 후 S3 호스트로 수정
        hostname: 'i.imgur.com',
      },
    ],
  },
};

export default nextConfig;
