class _generic {
  constructor() {

    // Global values
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
	
    // Initialize History
    this.history = {}

  }

  // Callable Functions - History
  updateHistory() {
    this.history = {
      Volume: this.Volume,
      Shuffle: this.Shuffle,
      Loop: this.Loop,
      isPlaying: this.isPlaying,
      isInactive: this.isInactive,
      Advertisement: this.Advertisement,
      Artist: this.Artist,
      Title: this.Title,
      Position: this.Position,
      Duration: this.Duration,
      Timestamp: this.Timestamp
    }
  }
 
  // Callable Functions - History - Update values from DOM
  valuesUpdate() {
    this.updateHistory()
    
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
    Object.entries(this).forEach(entry => {
      let entryKey = entry[0]
      let entryValue = entry[1]

      if (entryKey == 'history') { return }
      if (entryKey == 'elementSelector') { return }
      if (entryKey == 'Timestamp') { return }
      if (entryValue == this.history[entryKey]) { return }
      changedValues[entryKey] = [entryValue, this.history[entryKey]]
    })
    return changedValues
  }

}
