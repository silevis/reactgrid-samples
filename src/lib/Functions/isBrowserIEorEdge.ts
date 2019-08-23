export function isBrowserIEorEdge() {
  const userAgent = window.navigator.userAgent;
  return userAgent.indexOf('Trident/') > 0 || userAgent.indexOf('Edge/') > 0
}