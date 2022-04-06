/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */

const withPlugins = require('next-compose-plugins');
const { createSecureHeaders } = require('next-secure-headers');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: createSecureHeaders(),
      },
    ];
  },
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
