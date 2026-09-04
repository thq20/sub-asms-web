/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_DEPLOY_BASE_PATH || "";
module.exports = { reactStrictMode: true, output: "export", trailingSlash: true, basePath, assetPrefix: basePath || undefined };
