function stripSelector(Selector) {
  // [0] = Name
  // [1] = Selector Type
  // [2] = Selector Identifier
  let xName = Selector[0]
  let xType = Selector[1].split("[")[0]
  
  // Fetch the Identifier
  let stripPre = Selector[1].split("[").pop()
  let stripPost = stripPre.split("]")[0]
  let xIdentifier = stripPost
  
  let X = [xName, xType, xIdentifier]
  
  return X
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
