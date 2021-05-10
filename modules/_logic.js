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
            strInfo += ' (Changing Songs) (cDuration: ' + this.Duration + ' | pDuration: ' + this.history.Duration + ')'
          } else {
            strInfo += ' {Position ' + entryValueOld + ' => ' + entryValueNew + '} {Time Difference: ' + (new Date() - this.history.Timestamp[0]) + '}'
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
      //console.info(`[JABA] [DEBUG] [Key:${entryKey}] [Value:${entryValueOld}] > [Value:${entryValueNew}] [TimeDiff:${timeDifference}] [TimeOld:${entryValueOldTimestamp}] [TimeNew:${entryValueNewTimestamp}]`)

      switch (entryKey) {
        case 'Volume':
          break

        case 'Shuffle':
          break

        case 'Loop':
          break

        case 'isPlaying':
          break

        case 'isInactive':
          break

        case 'Advertisement':
          break

        case 'Artist':
          break

        case 'Title':
          break

        case 'Position':
          let nowTimestamp = new Date()
          let historyTimestamp = this.history.Timestamp[0]
          let differenceTimestamp = Math.abs(nowTimestamp - historyTimestamp) // Time in MS since last update
          
          let nowPosition = entryValueNew
          let historyPosition = entryValueOld
          let differencePosition = (Math.abs(nowPosition - historyPosition)) * 1000 - 750
          
          if ( entryValueOld >= 1 && entryValueNew == 0 && this.history.Duration != this.Duration ) { strStates += '(Track Change) ' } 
          else if ( differenceTimestamp <= differencePosition ) { strStates += '(Track Skim | TDiff=' + differenceTimestamp + ' PDiff=' + differencePosition + ' ) ' }
          break

        case 'Duration':
          break

      }      

    })
    
    return strStates
    
  }
  
  
}
