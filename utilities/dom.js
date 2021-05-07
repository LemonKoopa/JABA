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

let elementCacheArray = {'': ''}

function cacheObject(Selector) {
  let objectValue = null
  if (elementCacheArray.hasOwnProperty(Selector)) {
    objectValue = elementCacheArray[Selector]
    if (objectValue == null) {
      objectValue = document.querySelector(Selector)
      console.debug('[JABA] [cacheObject] [SUCCESS] (' + Selector + ') is cached but null | re-fetching  => ' + objectValue + '')
    } else {
    console.debug('[JABA] [cacheObject] [SUCCESS] (' + Selector + ') is cached | returning cached  => ' + objectValue + '')
    }
  } else {
    try {
      objectValue = document.querySelector(Selector)
      elementCacheArray[Selector] = objectValue
      console.debug('[JABA] [cacheObject] [SUCCESS] (' + Selector + ') is not cached | Caching and returning => ' + objectValue + '')
    } catch(error) {
      console.debug('[JABA] [cacheObject] [ERROR=' + error + '] => ' + error + '')
    }
  }
  return objectValue
}

function getElementBySelector(Selector) {
  let element = null
  try {
    element = cacheObject(Selector)
    console.debug('[JABA] [getElementBySelector] [SUCCESS] => (' + Selector + ')')
  } catch(error) {
    console.debug('[JABA] [getElementBySelector] [ERROR=' + error + '] => (' + Selector + ')')
  }
  return element
}

function getElementBySelectors(Selector) {
  let element = null
  try {
    element = document.querySelectorAll(Selector)
    console.debug('[JABA] [getElementBySelectors] => (' + Selector + ') Found (' + element.length + ')')
  } catch(error) {
    console.debug('[JABA] [getElementBySelectors] Error => ' + error + '')
  }
  return element[0]
}

function controlClick(x) {
  try {
    getElementBySelector(x).click()
    console.debug('[JABA] [controlClick] [SUCCESS] => [' + x + ']')
    return true
  } catch (error) {
    console.debug('[JABA] [controlClick] [ERROR=' + error + '] => [' + x + ']')
    return false
  }
}

function existsInArray(node, array) {
  let check = false

  // Iterate through array for comparison
  Object.entries(array).find(item => {
    let arrayItem = stripSelector(item)[2]
    let domItem = node['outerHTML']
    if (domItem.includes(arrayItem)) {
      console.debug('[JABA] [existsInArray] => Matched. ' + arrayItem + ' == ' + domItem + '')
      check = true
      return true
    } else {
      console.debug('[JABA] [existsInArray] => No Match. ' + arrayItem + ' != ' + domItem + '')
      return false
    }
  })
  return check
}
