const format = require('xml-formatter');
const parser = require('fast-xml-parser');

const $paste = document.getElementById('paste');
const $result = document.getElementById('xml');
const $instructions = document.getElementById('instructions');
const $error = document.getElementById('error');

const ERROR_SYMBOL = Symbol();

function formatXML(xmlString) {
  try {
    const valid = parser.validate(xmlString);
    if (valid !== true) throw Error();
    const formattedXml = format(xmlString, { collapseContent: true });
    return formattedXml;
  } catch (e) {
    return ERROR_SYMBOL;
  }
}

$paste.onpaste = event => {
  let rawPaste;

  if (window.clipboardData && window.clipboardData.getData) {
    rawPaste = window.clipboardData.getData('Text');
  } else if (event.clipboardData && event.clipboardData.getData) {
    rawPaste = event.clipboardData.getData('text/plain');
  }

  const result = formatXML(rawPaste);

  if (result === ERROR_SYMBOL) {
    $result.style.display = 'none';
    $instructions.style.display = 'none';
    $error.style.display = 'block';
  } else {
    $result.style.display = 'block';
    $result.innerText = result;
    $instructions.style.display = 'none';
    $error.style.display = 'none';
  }

  return false; // prevent default
};
