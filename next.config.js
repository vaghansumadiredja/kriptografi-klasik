/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true, layers: true };
    // config.experimental = { appDir: true };
    return config;
  },
  experimental: { appDir: true },
};

module.exports = nextConfig;
