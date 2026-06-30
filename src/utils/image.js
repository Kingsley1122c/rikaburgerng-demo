export function getImageWithFallback(source, fallback) {
  if (typeof source === 'string' && source.trim()) {
    return source;
  }

  return fallback;
}
