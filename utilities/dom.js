function getElementBySelector(Selector)
  {
	  
	var element = document.querySelectorAll(Selector);
	console.log('[JABA-DEBUG] Function (getElementBySelector) Value (' + Selector + ') Found (' + element.length + ')');
	return element[0]
	
  }
