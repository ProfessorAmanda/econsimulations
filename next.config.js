module.exports = {
  eslint: {
    dirs: ['src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
}
