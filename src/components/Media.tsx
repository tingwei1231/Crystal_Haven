import { useState } from 'react';
import { assetUrl } from '../lib/assets';

export function Media({ src, alt, priority = false, className = '' }: { src?: string; alt: string; priority?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className={`media-fallback ${className}`} role="img" aria-label={alt}><span>影像待補充<br />{alt}</span></div>;
  const optimized = src.endsWith('.webp');
  return <img className={className} src={assetUrl(src)} alt={alt} width="1200" height="900" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" onError={() => setFailed(true)} srcSet={optimized ? `${assetUrl(src.replace('.webp', '-640.webp'))} 640w, ${assetUrl(src)} 1200w` : undefined} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 60vw" />;
}
