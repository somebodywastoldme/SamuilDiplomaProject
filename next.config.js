// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const { env } = require('./src/server/env');
/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function getConfig(config) {
  return config;
}

/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
module.exports = getConfig({
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
  eslint: { ignoreDuringBuilds: !!process.env.CI }
});

module.exports = {
  async headers() {
    return [
      {
        source: '/public/fonts/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Content-Type',
            value: 'font/opentype',
          },
        ],
      },
    ];
  },
};