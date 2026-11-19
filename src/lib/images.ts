/**
 * Imagens responsivas via Vercel CDN (WebP). Só permite caminhos locais e
 * imagens públicas do catálogo, evitando o uso aberto do otimizador como proxy.
 * No Vite local, usa o arquivo original para manter o dev server funcional.
 */
const allowedRemoteHost = 'pxizyivehrwwgwhjjynv.supabase.co';
const widths = [480, 640, 800, 960, 1200, 1600, 1920] as const;
type ImageWidth = typeof widths[number];

export function optimizedImage(src: string, width: ImageWidth, quality: 60 | 65 | 70 | 75 | 80 = 70): string {
  if (!src || import.meta.env.DEV) return src;
  const isLocal = src.startsWith('/images/');
  let isPublicCatalog = false;
  if (!isLocal) {
    try {
      const url = new URL(src);
      isPublicCatalog = url.protocol === 'https:' && url.hostname === allowedRemoteHost &&
        url.pathname.startsWith('/storage/v1/object/public/marques-vehicles/');
    } catch { /* Uma URL desconhecida permanece intacta. */ }
  }
  if (!isLocal && !isPublicCatalog) return src;
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

export function responsiveImageSet(
  src: string,
  sizes: readonly ImageWidth[] = [480, 800, 1200],
  quality: 60 | 65 | 70 | 75 | 80 = 70,
): string | undefined {
  if (!src || import.meta.env.DEV) return undefined;
  const optimized = sizes.map(width => optimizedImage(src, width, quality));
  if (optimized.every(url => url === src)) return undefined;
  return optimized.map((url, index) => `${url} ${sizes[index]}w`).join(', ');
}
