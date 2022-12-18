const allTable = document.getElementsByTagName('table');

const statsTable = allTable[1];
var innerText = statsTable.innerText;

var lines = innerText.split('\n');
lines.splice(0,4);

var newText = lines.join('\n');

navigator.clipboard.writeText(newText);

const sendStats = browser.runtime.sendMessage(newText);