class _generic {
  constructor() {

    // Global values
    this.Username = null
    this.Volume = null
    this.Shuffle = null
    this.Loop = null
    this.isPlaying = null
    this.isInactive = null
    this.Advertisement = null

    // Track-specific values
    this.Artist = null
    this.Title = null
    this.Duration = null
    this.Position = null

    // Initialize Timestamp
    this.Timestamp = null

    // Initialize History
    this.history = {}

  }

  // Callable Functions - History
  updateHistory() {
    let keyBlacklist = [ 'history', 'elementSelector' ]
    Object.entries(this).forEach(entry => {
      let entryKey = entry[0]
      let entryValue = entry[1]
      if (keyBlacklist.includes(entryKey)) { return }
      this.history[entryKey] = entryValue
    })

  }

  // Callable Functions - History - Update values from DOM
  valuesUpdate() {
    this.updateHistory()

    this.Username = this.getUsername()
    this.Volume = this.getVolume()
    this.Shuffle = this.getShuffle()
    this.Loop = this.getLoop()
    this.isPlaying = this.getIsPlaying()
    this.isInactive = this.getIsInactive()
    this.Advertisement = this.getAdvertisement()
    this.Artist = this.getArtist()
    this.Title = this.getTitle()
    this.Position = this.getPosition()
    this.Duration = this.getDuration()
    this.Timestamp = new Date()
  }

  // Returns an object array of changed values { key: 'newValue', 'oldValue' }
  hasChanged() {
    let changedValues = []
    let keyBlacklist = ['history', 'elementSelector', 'Timestamp' ]
    Object.entries(this).forEach(entry => {
      let entryKey = entry[0]
      let entryValue = entry[1]
      let historyValue = this.history[entryKey]
			if ( keyBlacklist.includes(entryKey) ) { return }
      if ( entryValue == historyValue ) { return }
      if ( entryValue == historyValue.toString() ) { return }
      changedValues[entryKey] = [entryValue, historyValue]
    })
    return changedValues
  }

}
