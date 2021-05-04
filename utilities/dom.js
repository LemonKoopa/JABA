function getElementBySelector(Selector) {

  var element = document.querySelectorAll(Selector);
  console.log('[JABA-DEBUG] Function (getElementBySelector) Value (' + Selector + ') Found (' + element.length + ')');
  return element[0]

}

function getElementBySelectors(Selector) {

  var element = document.querySelectorAll(Selector);
  console.log('[JABA-DEBUG] Function (getElementBySelectors) Value (' + Selector + ') Found (' + element.length + ')');
  return element

}

function controlClick(x) {

  try {

    getElementBySelector(x).click();
    console.log('[JABA-DEBUG] [controlClick] > [' + x + '] | [SUCCESS]');
    return true;

  } catch (error) {

    console.log('[JABA-DEBUG] [controlClick] > [' + x + '] | [FAILURE]');
    return false;

  }

}
