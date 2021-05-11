class playerSoundCloud extends _logic {
  constructor() {
    super()

    // Queries
    this.elementSelector = {
      'elementReady': 'div[class="listenDetails__trackList"]',
      'elementNowPlaying': 'section[aria-label="miniplayer"]',
      'Volume': 'div[aria-label="Volume"]',
      'Shuffle': 'button[class*="shuffleControl"]',
      'Loop': 'button[class*="repeatControl"]',
      'isPlaying': 'button[aria-label="Pause current"]',
      'isInactive': 'div[class="playbackSoundBadge__titleContextContainer"]',
      'Advertisement': 'a[data-testid="track-info-advertiser"]',
      'Artist': 'a[class*="playbackSoundBadge__lightLink"]',
      'Title': 'div[class*="playbackSoundBadge__title"] > a:nth-child(1) > span:nth-child(2)',
      'Position': 'div[class="playbackTimeline__progressWrapper"]',
      'Duration': 'div[class="playbackTimeline__progressWrapper"]',
      'buttonVolume': 'div[aria-label="Volume"]',
      'buttonShuffle': 'button[class="shuffleControl sc-ir"]',
      'buttonLoop': 'button[class="repeatControl sc-ir m-all"]',
      'buttonPrevious': 'button[class*="playControls__prev"]',
      'buttonPause': 'button[class*="playControls__play playing"]',
      'buttonPlay': 'button[class*="playControls__play"]',
      'buttonNext': 'button[class*="playControls__next]"',
      'buttonPlaylistPlay': 'div[class*="soundTitle__playButtonHero"] > a:nth-child(1)'
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

  // Callable Functions - Update Stats - Global Value
  getVolume() {
    //console.debug('[JABA] getVolume => ' + getElementBySelector(this.elementSelector.Volume).getAttribute('aria-valuenow') * 100)
    return getElementBySelector(this.elementSelector.Volume).getAttribute('aria-valuenow') * 100
  }
  getShuffle() {
    //console.debug('[JABA] getShuffle => ' + (getElementBySelector(this.elementSelector.Shuffle).getAttribute('class') === "shuffleControl sc-ir m-shuffling"))
    return getElementBySelector(this.elementSelector.Shuffle).getAttribute('class') === "shuffleControl sc-ir m-shuffling"
  }
  getLoop() {
    //console.debug('[JABA] getLoop => ' + (getElementBySelector(this.elementSelector.Loop).getAttribute('class') === "repeatControl sc-ir m-one"))
    return getElementBySelector(this.elementSelector.Loop).getAttribute('class') === "repeatControl sc-ir m-all"
  }
  getIsPlaying() {
    //console.debug('[JABA] getIsPlaying => ' + !!getElementBySelector(this.elementSelector.isPlaying))
    return !!getElementBySelector(this.elementSelector.isPlaying)
  }
  getIsInactive() {
    let toggleState = true
    if (this.Position != 0 && this.isPlaying == true) { toggleState = false }
    //console.debug('[JABA] getIsInactive => ' + toggleState)
    return toggleState
  }
  getAdvertisement() {
    //console.debug('[JABA] getAdvertisement => ' + !!getElementBySelector(this.elementSelector.Advertisement))
    return !!getElementBySelector(this.elementSelector.Advertisement)
  }

  // Callable Functions - Update Stats - Track-specific Values
  getArtist() {
    //console.debug('[JABA] getArtist => ' + getElementBySelector(this.elementSelector.Artist).innerText)
    return getElementBySelector(this.elementSelector.Artist).title
  }
  getTitle() {
    //console.debug('[JABA] getTitle => ' + getElementBySelector(this.elementSelector.Title).innerText
    return getElementBySelector(this.elementSelector.Title).innerText
  }
  getPosition() {
    //console.debug('[JABA] getPosition => ' + getElementBySelector(this.elementSelector.Position).getAttribute('aria-valuenow'))
    return getElementBySelector(this.elementSelector.Position).getAttribute('aria-valuenow')
  }
  getDuration() {
    //console.debug('[JABA] getDuration => ' + getElementBySelector(this.elementSelector.Duration).getAttribute('aria-valuemax'))
    return getElementBySelector(this.elementSelector.Duration).getAttribute('aria-valuemax')
  }

}
