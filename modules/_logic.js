class _logic extends _generic {
  constructor() {
    super()

  }

  currentAction() {

    let strStates = '[currentAction] '
    let timePlayed = 0

    Object.entries(this.hasChanged()).forEach(item => {
			let entry = { 'Key': item[0], 'Value': item[1][0], 'oldValue': item[1][1] }

      switch (entry.Key) {
        case 'Volume':
          strStates +=
          '[Status: Volume (' + entry.oldValue + ' > ' + entry.Value + ')] '
          break

        case 'Shuffle':
          strStates +=
          '[Status: Shuffle (' + entry.oldValue + ' > ' + entry.Value + ')] '
          break

        case 'Loop':
          strStates +=
          '[Status: Loop (' + entry.oldValue + ' > ' + entry.Value + ')] '
          break

        case 'isPlaying':
          strStates +=
          '[Status: Playing (' + entry.oldValue + ' > ' + entry.Value + ')] '
          break

        case 'isInactive':
          strStates +=
          '[Status: Inactive (' + entry.oldValue + ' > ' + entry.Value + ')] '
          break

        case 'Advertisement':
          strStates +=
          '[Status: Advertisement (' + entry.oldValue + ' > ' + entry.Value + ')] '
          break

        case 'Artist':
          strStates +=
          '[Status: Artist (' + entry.oldValue + ' > ' + entry.Value + ')] '
          break

        case 'Title':
          strStates +=
          '[Status: Title (' + entry.oldValue + ' > ' + entry.Value + ')] '
          break

        case 'Position':
          let Timestamp = { 'now': new Date(), 'old': this.history.Timestamp }
          let Position = { 'now': entry.Value, 'old': entry.oldValue }
          let Duration = { 'now': this.Duration, 'old': this.history.Duration }
          // Time in MS since last update
          Timestamp.difference = Math.abs(Timestamp.now - Timestamp.old)
					Position.difference = (Math.abs(Position.now - Position.old)) * 1000 - 750

          if (
            Position.old >= 5 &&
            Position.now <= 5 ) {
            strStates +=
            '[Status: Track Change] '
            strStates +=
            '[Request: Update statistics] '
            strStates +=
            '[Request: Upload to cloud] '
          }
          else if (
            Timestamp.difference <= Position.difference &&
            Position.now != 0 &&
            Position.old != Duration.old &&
            Position.old != 0 ) {
            strStates +=
            '[Status: Track Skim (TDiff=' + Position.difference + ')] '
          }
          if (
            Position.now == 0 &&
            this.isPlaying == false ) {
            strStates +=
            '[Status: Not Active] '
          }
          break

        case 'Duration':
          break

      }

    })

    return strStates

  }


}
