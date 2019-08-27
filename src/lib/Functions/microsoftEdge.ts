export function isBrowserEdge() {
  const userAgent = window.navigator.userAgent;
  return userAgent.indexOf('Edge/') > 0;
}