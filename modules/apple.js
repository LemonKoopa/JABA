class playerApple extends _logic {
  constructor() {
    super()

    // Queries
    this.elementSelector = {
      'elementReady':       'div[aria-label="Media Controls"]',
      'elementNowPlaying':  'div[aria-label="Media Controls"]',
      'Volume':             'input[aria-label="Volume"]',
      'Shuffle':            'div[aria-label="Shuffle"]',
      'Loop':               'div[aria-label="Repeat one"]',
      'isPlaying':          'button[aria-label="Play"]',
      'isInactive':         'div[class*="playback-description-not-loaded"]',
      'Advertisement':      'a[data-testid="track-info-advertiser"]',
      'Artist':             'audio[id="apple-music-player"]',
      'Title':              'audio[id="apple-music-player"]',
      'Position':           'input[class="web-chrome-playback-lcd__scrub"]',
      'Duration':           'input[class="web-chrome-playback-lcd__scrub"]',
      'buttonVolume':       'button[aria-label="Change volume"]',
      'buttonShuffle':      'button[aria-label="Shuffle"]',
      'buttonLoop':         'button[data-testid="control-button-repeat"]',
      'buttonPrevious':     'button[aria-label="Previous"]',
      'buttonPause':        'button[aria-label="Pause"]',
      'buttonPlay':         'button[aria-label="Play"]',
      'buttonNext':         'button[aria-label="Next"]',
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

  // Callable Functions - Update Stats - Global Value
  getVolume() {
    return getElementBySelector(this.elementSelector.Volume).getAttribute('style').slice(10).split("%")[0]
  }
  getShuffle() {
    return getElementBySelector(this.elementSelector.Shuffle).getAttribute('aria-checked') === "true"
  }
  getLoop() {
    return !getElementBySelector(this.elementSelector.Loop)
  }
  getIsPlaying() {
    return !getElementBySelector(this.elementSelector.isPlaying)
  }
  getIsInactive() {
    return !!getElementBySelector(this.elementSelector.isInactive)
  }
  getAdvertisement() {
    return !getElementBySelector(this.elementSelector.Advertisement)
  }

  // Callable Functions - Update Stats - Track-specific Values
  getArtist() {
    return getElementBySelector(this.elementSelector.Artist).title.split(' - ')[1].split(' & ')[0]
  }
  getTitle() {
    return getElementBySelector(this.elementSelector.Title).title.split(' - ')[0]
  }
  getPosition() {
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Position).getAttribute('aria-valuenow'))
  }
  getDuration() {
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Duration).getAttribute('aria-valuemax'))
  }

}
