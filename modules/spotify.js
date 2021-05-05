class playerSpotify {
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

    // Initialize History
    this.historyPrevious = [];
    this.historyCurrent = [];

    // Queries
    this.elementSelector = {
      'elementReady': 'div[data-testid="playlist-tracklist"]',
      'elementContainer': 'div[class="Root__now-playing-bar"]',
      'elementNowPlaying': 'div[data-testid="now-playing-widget"]',
      'Volume': 'button[aria-label="Change volume"]',
      'Shuffle': 'button[data-testid="control-button-shuffle"]',
      'Loop': 'button[data-testid="control-button-repeat"]',
      'isPlaying': 'button[data-testid="control-button-pause"]',
      'isInactive': 'button[data-testid="control-button-pause"]',
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
    let x = [this.Volume, this.Shuffle, this.Loop, this.isPlaying, this.isInactive, this.Advertisement, this.Artist, this.Title, this.Position, this.Duration];
    console.log('[JABA-DEBUG] Function [valuesStringify] Result [' + x + ']');
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
    return getElementBySelector(this.elementSelector.Volume).getAttribute('style').slice(6).split("%")[0].split(".")[0];
  }
  getShuffle() {
    console.log('[JABA-INFO] Shuffle ' + this.Shuffle);
    return getElementBySelector(this.elementSelector.Shuffle).getAttribute('aria-checked') === "true";
  }
  getLoop() {
    console.log('[JABA-INFO] Loop ' + this.Loop);
    return getElementBySelector(this.elementSelector.Loop).getAttribute('aria-checked') === "mixed";
  }
  getIsPlaying() {
    console.log('[JABA-INFO] isPlaying ' + this.isPlaying);
    return getElementBySelectors(this.elementSelector.isPlaying).length > 0;
  }
  getIsInactive() {
    console.log('[JABA-INFO] isInactive ' + this.isInactive);
    return getElementBySelectors(this.elementSelector.isInactive).length > 0;
  }
  getAdvertisement() {
    console.log('[JABA-INFO] Advertisement ' + this.Advertisement);
    return getElementBySelectors(this.elementSelector.Advertisement).length > 0;
  }

  // Callable Functions - Update Stats - Track-specific Values
  getArtist() {
    console.log('[JABA-INFO] Artist ' + this.Artist);
    return getElementBySelector(this.elementSelector.Artist).innerText;
  }
  getTitle() {
    console.log('[JABA-INFO] Title ' + this.Title);
    return getElementBySelector(this.elementSelector.Title).text;
  }
  getPosition() {
    console.log('[JABA-INFO] Position ' + this.Position);
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Position).innerText);
  }
  getDuration() {
    console.log('[JABA-INFO] Duration ' + this.Duration);
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Duration).innerText);
  }

}
