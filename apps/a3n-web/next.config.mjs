/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@workspace/ui'],
  typescript: {
    // Skip type-checking a3n-api during build (handled by its own tsconfig)
    ignoreBuildErrors: true,
  },
}

export default nextConfig
