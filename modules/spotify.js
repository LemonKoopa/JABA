class playerSpotify {
  constructor(Volume, Shuffle, Loop, isPlaying, isInactive, Advertisement, Artist, Title, Position, Duration, historyPrevious, historyCurrent) {

    // Initialize History
    this.historyPrevious = []
    this.historyCurrent = []

    // Global values
    this.Volume = Volume
    this.Shuffle = Shuffle
    this.Loop = Loop
    this.isPlaying = isPlaying
    this.isInactive = isInactive
    this.Advertisement = Advertisement

    // Track-specific values
    this.Artist = Artist
    this.Title = Title
    this.Duration = Duration
    this.Position = Position

    // Queries
    this.elementSelector = {
      'elementReady': 'div[data-testid="playlist-tracklist"]',
      'elementContainer': 'div[class="Root__now-playing-bar"]',
      'elementNowPlaying': 'div[class="Root__now-playing-bar"]',
      'Volume': 'button[aria-label="Change volume"]',
      'Shuffle': 'button[data-testid="control-button-shuffle"]',
      'Loop': 'button[data-testid="control-button-repeat"]',
      'isPlaying': 'title',
      'isInactive': 'div[data-testid="now-playing-widget"]',
      'Advertisement': 'a[data-testid="track-info-advertiser"]',
      'Artist': 'div[data-testid="track-info-artists"]',
      'Title': 'a[data-testid="nowplaying-track-link"]',
      'Position': 'div[data-testid="playback-position"]',
      'Duration': 'div[data-testid="playback-duration"]',
      'buttonVolume': 'button[aria-label="Change volume"]',
      'buttonShuffle': 'button[data-testid="control-button-shuffle"]',
      'buttonLoop': 'button[data-testid="control-button-repeat"]',
      'buttonPrevious': 'button[aria-label="Previous"]',
      'buttonPause': 'button[data-testid="control-button-pause"]',
      'buttonPlay': 'button[data-testid="control-button-play"]',
      'buttonNext': 'button[data-testid="control-button-skip-forward"]',
      'buttonPlaylistPlay': 'button[data-testid="play-button"]'
    }

  }

  // Callable Functions - Controls
  controlsVolume() {
    controlClick(this.elementSelector.buttonVolume)
  }
  controlsShuffle() {
    controlClick(this.elementSelector.buttonShuffle)
  }
  controlsLoop() {
    controlClick(this.elementSelector.buttonLoop)
  }
  controlsPrevious() {
    controlClick(this.elementSelector.buttonPrevious)
  }
  controlsPause() {
    controlClick(this.elementSelector.buttonPause)
  }
  controlsPlay() {
    controlClick(this.elementSelector.buttonPlay)
  }
  controlsNext() {
    controlClick(this.elementSelector.buttonNext)
  }
  controlsPlaylistPlay() {
    controlClick(this.elementSelector.buttonPlaylistPlay)
  }

  // Callable Functions - History
  valuesStringify() {
    let x = [this.Volume, this.Shuffle, this.Loop, this.isPlaying, this.isInactive, this.Advertisement, this.Artist, this.Title, this.Position, this.Duration]
    console.debug('[JABA] Function [valuesStringify] Result [' + x + ']')
    return x
  }

  valuesUpdate() {
    console.debug('[JABA] Function [valuesUpdate]')
    this.historyPrevious = this.valuesStringify()
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
    this.historyCurrent = this.valuesStringify()
		
	// Display information to console
    if (this.historyPrevious.toString() !== this.historyCurrent.toString()) {
      let stringInfo = `[JABA] Volume (${this.Volume}) Shuffle (${this.Shuffle}) Loop (${this.Loop}) | Artist (${this.Artist}) Track (${this.Title}) Position (${this.Position}) Duration (${this.Duration}) | isPlaying (${this.isPlaying}) isInactive (${this.isInactive})`
      console.info(stringInfo)
    }
  
  }
  
  // Callable Functions - Update Stats - Global Value
  getVolume() {
    return getElementBySelector(this.elementSelector.Volume).getAttribute('style').slice(6).split("%")[0].split(".")[0]
  }
  getShuffle() {
    return getElementBySelector(this.elementSelector.Shuffle).getAttribute('aria-checked') === "true"
  }
  getLoop() {
    return getElementBySelector(this.elementSelector.Loop).getAttribute('aria-checked') === "mixed"
  }
  getIsPlaying() {
    return !!document.title.includes(' · ')
  }
  getIsInactive() {
    return !getElementBySelector(this.elementSelector.isInactive)
  }
  getAdvertisement() {
    return !getElementBySelector(this.elementSelector.Advertisement)
  }

  // Callable Functions - Update Stats - Track-specific Values
  getArtist() {
    return getElementBySelector(this.elementSelector.Artist).innerText
  }
  getTitle() {
    return getElementBySelector(this.elementSelector.Title).innerText
  }
  getPosition() {
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Position).innerText)
  }
  getDuration() {
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Duration).innerText)
  }

}
