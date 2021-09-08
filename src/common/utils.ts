/**
 * Creates human readable count ie. `24212 = 24.2k`.
 *
 * @param n Count number
 * @returns {string} string
 */
export const humanReadbleCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();
