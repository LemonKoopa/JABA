class playerApple {
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
      'elementReady': 'div[aria-label="Media Controls"]',
      'elementContainer': 'div[aria-label="Media Controls"]',
      'elementNowPlaying': 'div[aria-label="Media Controls"]',
      'Volume': 'input[aria-label="Volume"]',
      'Shuffle': 'div[aria-label="Shuffle"]',
      'Loop': 'div[aria-label="Repeat one"]',
      'isPlaying': 'button[aria-label="Play"]',
      'isInactive': 'div[class*="playback-description-not-loaded"]',
      'Advertisement': 'a[data-testid="track-info-advertiser"]',
      'Artist': 'span[class="web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper"] > span:first-child',
      'Title': 'span[class="web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper"] > span:nth-child(2)',
      'Position': 'input[class="web-chrome-playback-lcd__scrub"]',
      'Duration': 'input[class="web-chrome-playback-lcd__scrub"]',
      'buttonVolume': 'button[aria-label="Change volume"]',
      'buttonShuffle': 'button[aria-label="Shuffle"]',
      'buttonLoop': 'button[data-testid="control-button-repeat"]',
      'buttonPrevious': 'button[aria-label="Previous"]',
      'buttonPause': 'button[aria-label="Pause"]',
      'buttonPlay': 'button[aria-label="Play"]',
      'buttonNext': 'button[aria-label="Next"]',
      'buttonPlaylistPlay': 'button[aria-label="Shuffle"]'
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
    return x;
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
    return getElementBySelector(this.elementSelector.Volume).getAttribute('style').slice(10).split("%")[0]
  }
  getShuffle() {
    return getElementBySelector(this.elementSelector.Shuffle).getAttribute('aria-checked') === "true"
  }
  getLoop() {
    return getElementBySelectors(this.elementSelector.Loop).length > 0
  }
  getIsPlaying() {
    return getElementBySelectors(this.elementSelector.isPlaying).length > 0
  }
  getIsInactive() {
    return getElementBySelectors(this.elementSelector.isInactive).length > 0
  }
  getAdvertisement() {
    return getElementBySelectors(this.elementSelector.Advertisement).length > 0
  }

  // Callable Functions - Update Stats - Track-specific Values
  getArtist() {
    return getElementBySelector(this.elementSelector.Artist)?.innerText
  }
  getTitle() {
    return getElementBySelector(this.elementSelector.Title)?.innerText
  }
  getPosition() {
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Position).getAttribute('aria-valuenow'))
  }
  getDuration() {
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Duration).getAttribute('aria-valuemax'))
  }

}
