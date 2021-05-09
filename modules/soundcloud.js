class playerSoundCloud extends _logic {
  constructor() {
    super()
    // Queries
    this.elementSelector = {
      'elementReady': 'div[class="listenDetails__trackList"]',
      'elementContainer': 'div[class="playControls__elements"]',
      'elementNowPlaying': 'div[class="playControls__elements"]',
      'Volume': 'div[class="volume__sliderWrapper"]',
      'Shuffle': 'button[class="shuffleControl sc-ir"]',
      'Loop': 'button[class="repeatControl sc-ir m-none"]',
      'isPlaying': 'button[aria-label="Pause current"]',
      'isInactive': 'div[class="playbackSoundBadge__titleContextContainer"]',
      'Advertisement': 'a[data-testid="track-info-advertiser"]', // come back to this -- doesn't detect ads
      'Artist': 'a[class="playbackSoundBadge__lightLink sc-link-light sc-link-secondary sc-truncate"]',
      'Title': 'a[class="playbackSoundBadge__titleLink sc-truncate"] > span:nth-child(2)',
      'Position': 'div[class="playbackTimeline__progressWrapper"]',
      'Duration': 'div[class="playbackTimeline__duration"] > span:nth-child(2)',
      'buttonVolume': 'div[class="volume__sliderWrapper"]',
      'buttonShuffle': 'button[class="shuffleControl sc-ir"]',
      'buttonLoop': 'button[class="repeatControl sc-ir m-none"]',
      'buttonPrevious': 'button[class="skipControl sc-ir playControls__control playControls__prev skipControl__previous"]',
      'buttonPause': 'button[aria-label="Pause current"]',
      'buttonPlay': 'button[aria-label="Play current"]',
      'buttonNext': 'button[class="skipControl sc-ir playControls__control playControls__next skipControl__next]"',
      'buttonPlaylistPlay': 'div[class="soundTitle__playButton soundTitle__playButtonHero"]'
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
    console.debug('getVolume => ' + getElementBySelector(this.elementSelector.Volume).getAttribute('aria-valuenow') * 100)
    return getElementBySelector(this.elementSelector.Volume).getAttribute('aria-valuenow') * 100
  }
  getShuffle() {
    console.debug('getShuffle => ' + (getElementBySelector(this.elementSelector.Shuffle).getAttribute('class') === "shuffleControl sc-ir m-shuffling"))
    return getElementBySelector(this.elementSelector.Shuffle).getAttribute('class') === "shuffleControl sc-ir m-shuffling"
  }
  getLoop() {
    console.debug('getLoop => ' + (getElementBySelector(this.elementSelector.Loop).getAttribute('class') === "repeatControl sc-ir m-one"))
    return getElementBySelector(this.elementSelector.Loop).getAttribute('class') === "repeatControl sc-ir m-one"
  }
  getIsPlaying() {
    console.debug('getIsPlaying => ' + !!getElementBySelector(this.elementSelector.isPlaying))
    return !!getElementBySelector(this.elementSelector.isPlaying)
  }
  getIsInactive() {
    console.debug('getIsInactive => ' + !getElementBySelector(this.elementSelector.isInactive))
    return !getElementBySelector(this.elementSelector.isInactive)
  }
  getAdvertisement() {
    console.debug('getAdvertisement => ' + !!getElementBySelector(this.elementSelector.Advertisement))
    return !!getElementBySelector(this.elementSelector.Advertisement)
  }

  // Callable Functions - Update Stats - Track-specific Values
  getArtist() {
    console.debug('getArtist => ' + getElementBySelector(this.elementSelector.Artist).innerText)
    return getElementBySelector(this.elementSelector.Artist).innerText
  }
  getTitle() {
    console.debug('getTitle => ' + getElementBySelector(this.elementSelector.Title).innerText)
    return getElementBySelector(this.elementSelector.Title).innerText
  }
  getPosition() {
    console.debug('getPosition => ' + getElementBySelector(this.elementSelector.Position).getAttribute('aria-valuenow'))
    return getElementBySelector(this.elementSelector.Position).getAttribute('aria-valuenow')
  }
  getDuration() {
    console.debug('getDuration => ' + convertTime2Seconds(getElementBySelector(this.elementSelector.Duration).innerText))
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Duration).innerText)
  }

}
