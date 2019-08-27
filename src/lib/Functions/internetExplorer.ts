export function isBrowserIE() {
  const userAgent = window.navigator.userAgent;
  return userAgent.indexOf('Trident/') > 0;
}

export function getDataToPasteInIE() {
  const win: any = window;
  const data: any = win.clipboardData.getData('text');
  const splittedData = data.split('\n');
  const preparedDataToPaste = splittedData.splice(0, splittedData.length - 1).map((el: any) => el.replace(/\s*$/, '')); // Remove last empty element and remove last character 'space' in each element;
  return preparedDataToPaste.map((line: any) => line.split(' ').map((t: any) => ({ text: t, data: t, type: 'text' })));
}