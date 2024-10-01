/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true }, // Next.js v13 app directory 사용 여부
  output: 'standalone',  // 여기서 standalone 폴더를 사용한다고 해준다.
};

export default nextConfig;