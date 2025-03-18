/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configuration output spécifique pour Vercel
  distDir: '.next',
  // Configuration pour les builds statiques
  output: 'export',
  // Si vous utilisez des images optimisées, ajoutez cette configuration
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig