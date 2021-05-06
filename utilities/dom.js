function stripSelector(Selector) {
  let stripPre = Selector.split("[").pop()
  let stripPost = stripPre.split("]")[0]
  return stripPost
}

function getElementBySelector(Selector) {
  var element = document.querySelectorAll(Selector)
  console.debug('[JABA] Function (getElementBySelector) Value (' + Selector + ') Found (' + element.length + ')')
  return element[0]
}

function getElementBySelectors(Selector) {
  var element = document.querySelectorAll(Selector)
  console.debug('[JABA] Function (getElementBySelectors) Value (' + Selector + ') Found (' + element.length + ')')
  return element
}

function controlClick(x) {
  try {
    getElementBySelector(x).click()
    console.debug('[JABA] [controlClick] > [' + x + '] | [SUCCESS]')
    return true
  } catch (error) {
    console.debug('[JABA] [controlClick] > [' + x + '] | [FAILURE]')
    return false
  }
}
