function stripSelector(Selector) {
  // [0] = Label
  // [1] = nodeType
  // [2] = Attribute Type
  // [3] = Query
  let attributeType = Selector[1].split("=")[0].split('[')[1].replace('*','')

  let oLabel = Selector[0]
  let oNodeName = Selector[1].split("[")[0]

  // Fetch the Identifier
  let stripPre = Selector[1].split("=").pop()
  let stripPost = stripPre.split("]")[0]
  let oQuery = stripPost.replace(/['"]+/g, '')

  let X = [oLabel, oNodeName, attributeType, oQuery]

  return X
}

let elementCacheArray = {'': ''}

function cacheObject(Selector) {
  let objectValue = null
  if (elementCacheArray.hasOwnProperty(Selector) &&
      elementCacheArray[Selector] != null &&
      !Selector.includes('playbackSoundBadge')
     ) {
    objectValue = elementCacheArray[Selector]
    //console.debug('[JABA] [getElementBySelector] [cached] [SUCCESS] => (' + Selector + ') DOM: ', objectValue)
  } else {
    objectValue = document.querySelector(Selector)
    elementCacheArray[Selector] = objectValue
    //console.debug('[JABA] [getElementBySelector] [uncached] [SUCCESS] => (' + Selector + ')')
  }
  return objectValue
}

function getElementBySelector(Selector) {
  let element = null
  try {
    element = cacheObject(Selector)
    //element = document.querySelector(Selector)
    //console.debug('[JABA] [getElementBySelector] [SUCCESS] => (' + Selector + ')')
  } catch(error) {
    //console.debug('[JABA] [getElementBySelector] [ERROR=' + error + '] => (' + Selector + ')')
  }
  return element
}

function getElementBySelectors(Selector) {
  let element = null
  try {
    element = document.querySelectorAll(Selector)
    //console.debug('[JABA] [getElementBySelectors] => (' + Selector + ') Found (' + element.length + ')')
  } catch(error) {
    //console.debug('[JABA] [getElementBySelectors] Error => ' + error + '')
  }
  return element[0]
}

function controlClick(x) {
  try {
    getElementBySelector(x).click()
    //console.debug('[JABA] [controlClick] [SUCCESS] => [' + x + ']')
    return true
  } catch (error) {
    //console.debug('[JABA] [controlClick] [ERROR=' + error + '] => [' + x + ']')
    return false
  }
}

function existsInArray(node, array) {
  let nodeName = null

  // Iterate through array for comparison
  Object.entries(array).find(entry => {
    let entryKey = entry[0]
    if (entryKey.includes('element')) { return }
    if (entryKey.includes('button'))  { return }

    let arrayStrip = stripSelector(entry)
    let arrayItem = arrayStrip[3]
    let domItem = node['outerHTML'].split('>')[0]
    nodeName = arrayStrip[0]
    if (domItem.includes(arrayItem)) {
      console.debug('[JABA] [existsInArray] => [' + nodeName + ' Matched.] [' + arrayItem + ' == ' + domItem + ']')
    } else {
      console.debug('[JABA] [existsInArray] => No Match found for [' + nodeName + '] ' + arrayItem + ' != ' + domItem + '')
    }
  })
  return nodeName
}
