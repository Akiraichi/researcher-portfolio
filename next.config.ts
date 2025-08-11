import type { NextConfig } from "next";

// Configure Next.js for static export suitable for GitHub Pages.
// In GitHub Actions, derive basePath/assetPrefix from GITHUB_REPOSITORY (owner/repo).
// For user/org pages (repo ends with .github.io), no basePath is needed.
const isCI = !!process.env.GITHUB_ACTIONS;
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPage = /\.github\.io$/i.test(repoName);
const ghBasePath = isCI && repoName && !isUserOrOrgPage ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Base path and asset prefix ensure assets and routes work under /<repo> on GitHub Pages
  basePath: ghBasePath || undefined,
  assetPrefix: ghBasePath || undefined,
};

export default nextConfig;
