/**
 * Resolves static asset paths taking into account Vite's BASE_URL
 * so images work seamlessly on GitHub Pages subpaths, custom domains, and local preview.
 */
export function resolveAssetPath(assetId?: string | null): string | null {
  if (!assetId) return null;
  const clean = assetId.replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL || "./";
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}${clean}`;
}
