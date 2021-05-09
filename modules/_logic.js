class _logic extends _generic {
  constructor() {
    super()

  }

  displayInfo() {
    let strInfo = '[JABA]'
    Object.entries(this.hasChanged()).forEach(entry => {
      let entryKey = entry[0]
      let entryValueNew = entry[1][0]
      let entryValueOld = entry[1][1]

      switch (entryKey) {
        case 'Volume':
          strInfo += ' {Volume => ' + entryValueNew + '}'
          break
        case 'Shuffle':
          strInfo += ' {Shuffle => ' + entryValueNew + '}'
          break
        case 'Loop':
          strInfo += ' {Loop => ' + entryValueNew + '}'
          break
        case 'isPlaying':
          strInfo += ' {isPlaying => ' + entryValueNew + '}'
          break
        case 'isInactive':
          strInfo += ' {isInactive => ' + entryValueNew + '}'
          break
        case 'Advertisement':
          strInfo += ' {Advertisement => ' + entryValueNew + '}'
          // Wait until a new duration that isnt 0
          break
        case 'Artist':
          strInfo += ' {Artist => ' + entryValueNew + '}'
          break
        case 'Title':
          strInfo += ' {Title => ' + entryValueNew + '}'
          break
        case 'Position':
          // Changing songs
          if (entryValueOld >= 1 && entryValueNew == 0) {
            strInfo += ' (Changing Songs)'
          } else {
            strInfo += ' {Position => ' + entryValueNew + '}'
          }
          break
        case 'Duration':
          strInfo += ' {Duration => ' + entryValueNew + '}'
          break
      }

    })
    if (strInfo !== '[JABA]') { return strInfo } else { return null }
  }



}
