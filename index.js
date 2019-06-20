const format = require('xml-formatter');

const $paste = document.getElementById('paste');
const $result = document.getElementById('xml');
const $instructions = document.getElementById('instructions');
const $error = document.getElementById('error');

const ERROR_SYMBOL = Symbol();

function formatXML(xml_string) {
  try {
    const formattedXml = format(xml_string, { collapseContent: true });
    return formattedXml;
  } catch (e) {
    return ERROR_SYMBOL;
  }
}

$paste.onpaste = event => {
  let raw_paste;

  if (window.clipboardData && window.clipboardData.getData) {
    raw_paste = window.clipboardData.getData('Text');
  } else if (event.clipboardData && event.clipboardData.getData) {
    raw_paste = event.clipboardData.getData('text/plain');
  }

  const result = formatXML(raw_paste);

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
