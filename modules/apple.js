class playerApple {
  constructor(Volume, Shuffle, Loop, isPlaying, isInactive, Advertisement, Artist, Title, Position, Duration, historyPrevious, historyCurrent) {

    // Global values
    this.Volume = Volume;
    this.Shuffle = Shuffle;
    this.Loop = Loop;
    this.isPlaying = isPlaying;
    this.isInactive = isInactive;
    this.Advertisement = Advertisement;

    // Track-specific values
    this.Artist = Artist;
    this.Title = Title;
    this.Duration = Duration;
    this.Position = Position;

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

    // Initialize History
    this.historyPrevious = [];
    this.historyCurrent = [];

  }

  // Callable Functions - Controls
  controlsVolume() {
    controlClick(this.elementSelector.buttonVolume);
  }
  controlsShuffle() {
    controlClick(this.elementSelector.buttonShuffle);
  }
  controlsLoop() {
    controlClick(this.elementSelector.buttonLoop);
  }
  controlsPrevious() {
    controlClick(this.elementSelector.buttonPrevious);
  }
  controlsPause() {
    controlClick(this.elementSelector.buttonPause);
  }
  controlsPlay() {
    controlClick(this.elementSelector.buttonPlay);
  }
  controlsNext() {
    controlClick(this.elementSelector.buttonNext);
  }
  controlsPlaylistPlay() {
    controlClick(this.elementSelector.buttonPlaylistPlay);
  }

  // Callable Functions - History
  valuesStringify() {
    console.log('[JABA-DEBUG] Function [valuesStringify] Result [' +  + ']');
    let x = [this.Volume, this.Shuffle, this.Loop, this.isPlaying, this.isInactive, this.Advertisement, this.Artist, this.Title, this.Position, this.Duration];
    return x;
  }

  valuesUpdate() {
		console.log('[JABA-DEBUG] Function [valuesUpdate]');
    this.historyPrevious = this.valuesStringify();
    this.Volume = this.getVolume();
    this.Shuffle = this.getShuffle();
    this.Loop = this.getLoop();
    this.isPlaying = this.getIsPlaying();
    this.isInactive = this.getIsInactive();
    this.Advertisement = this.getAdvertisement();
    this.Artist = this.getArtist();
    this.Title = this.getTitle();
    this.Position = this.getPosition();
    this.Duration = this.getDuration();
    this.historyCurrent = this.valuesStringify();
    
    if (this.historyPrevious.toString() == this.historyCurrent.toString()) {
      return
    }

  }

  // Callable Functions - Update Stats - Global Value
  getVolume() {
    console.log('[JABA-INFO] Volume ' + this.Volume);
    return getElementBySelector(this.elementSelector.Volume).getAttribute('style').slice(10).split("%")[0];
  }
  getShuffle() {
    console.log('[JABA-INFO] Shuffle ' + this.Shuffle);
    return getElementBySelector(this.elementSelector.Shuffle).getAttribute('aria-checked') === "true";
  }
  getLoop() {
    console.log('[JABA-INFO] Loop ' + this.Loop);
    return document.querySelectorAll(this.elementSelector.Loop).length > 0;
  }
  getIsPlaying() {
    console.log('[JABA-INFO] isPlaying ' + this.isPlaying);
    return document.querySelectorAll(this.elementSelector.isPlaying).length > 0;
  }
  getIsInactive() {
    console.log('[JABA-INFO] isInactive ' + this.isInactive);
    return document.querySelectorAll(this.elementSelector.isInactive).length > 0;
  }
  getAdvertisement() {
    console.log('[JABA-INFO] Advertisement ' + this.Advertisement);
    return document.querySelectorAll(this.elementSelector.Advertisement).length > 0;
  }

  // Callable Functions - Update Stats - Track-specific Values
  getArtist() {
    console.log('[JABA-INFO] Artist ' + this.Artist);
    return getElementBySelector(this.elementSelector.Artist)?.innerText;
  }
  getTitle() {
    console.log('[JABA-INFO] Title ' + this.Title);
    return getElementBySelector(this.elementSelector.Title)?.innerText;
  }
  getPosition() {
    console.log('[JABA-INFO] Position ' + this.Position);
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Position).getAttribute('aria-valuenow'));
  }
  getDuration() {
    console.log('[JABA-INFO] Duration ' + this.Duration);
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Duration).getAttribute('aria-valuemax'));
  }

}
