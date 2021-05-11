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
            //strInfo += ' (Changing Songs)'
          } else {
            //strInfo += ' {Position ' + entryValueOld + ' => ' + entryValueNew + '} {Time Difference: ' + (new Date() - this.history.Timestamp) + '}'
          }
          break
        case 'Duration':
          strInfo += ' {Duration => ' + entryValueNew + '}'
          break
      }

    })
    if (strInfo !== '[JABA]') { return strInfo } else { return null }
  }

  currentAction() {
    
    let strStates = '[currentAction] '
    
    Object.entries(this.hasChanged()).forEach(entry => {

      let entryKey = entry[0]
      let entryValueNew = entry[1][0]
      let entryValueOld = entry[1][1]

      switch (entryKey) {
        case 'Volume':
          strStates += '[Status: Volume (' + entryValueOld + ' > ' + entryValueNew + ')] '
          break

        case 'Shuffle':
          strStates += '[Status: Shuffle (' + entryValueOld + ' > ' + entryValueNew + ')] '
          break

        case 'Loop':
          strStates += '[Status: Loop (' + entryValueOld + ' > ' + entryValueNew + ')] '
          break

        case 'isPlaying':
          strStates += '[Status: Playing (' + entryValueOld + ' > ' + entryValueNew + ')] '
          break

        case 'isInactive':
          strStates += '[Status: Inactive (' + entryValueOld + ' > ' + entryValueNew + ')] '
          break

        case 'Advertisement':
          strStates += '[Status: Advertisement (' + entryValueOld + ' > ' + entryValueNew + ')] '
          break

        case 'Artist':
          strStates += '[Status: Artist (' + entryValueOld + ' > ' + entryValueNew + ')] '
          break

        case 'Title':
          strStates += '[Status: Title (' + entryValueOld + ' > ' + entryValueNew + ')] '
          break

        case 'Position':
          let historyDuration = this.history.Duration
          let nowDuration = this.Duration
          
          let nowTimestamp = new Date()
          let historyTimestamp = this.history.Timestamp
          let differenceTimestamp = Math.abs(nowTimestamp - historyTimestamp) // Time in MS since last update
          
          let nowPosition = entryValueNew
          let historyPosition = entryValueOld
          let differencePosition = (Math.abs(nowPosition - historyPosition)) * 1000 - 750
          
          if ( historyPosition >= 10 && nowPosition <= 10 ) { 
            strStates += '[Status: Track Change] '
            strStates += '[Request: Update statistics] '
            strStates += '[Request: Upload to cloud] '
          } 
          else if ( differenceTimestamp <= differencePosition && nowPosition != 0 && historyPosition != historyDuration && historyPosition != 0 ) { 
            strStates += '[Status: Track Skim (TDiff=' + differencePosition + ')] ' 
          }
          break

        case 'Duration':
          break

      }      

    })
    
    return strStates
    
  }
  
  
}
