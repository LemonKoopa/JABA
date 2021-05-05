class playerSoundCloud {
  constructor(Volume, Shuffle, Loop, isPlaying, isInactive, Advertisement, Artist, Title, Position, Duration, historyPrevious, historyCurrent) {

    // Initialize History
    this.historyPrevious = [];
    this.historyCurrent = [];

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
      'elementReady': 'div[class="listenDetails__trackList"]',
      'elementContainer': 'div[class="playControls__elements"]',
      'elementNowPlaying': 'div[class="playControls__soundBadge"]',
      'Volume': 'div[class="volume__sliderWrapper"]',
      'Shuffle': 'button[class="shuffleControl sc-ir"]',
      'Loop': 'button[class="repeatControl sc-ir m-none"]',
      'isPlaying': 'button[aria-label="Pause current"]',
      'isInactive': 'div[class="playbackSoundBadge__titleContextContainer"]',
      'Advertisement': 'a[data-testid="track-info-advertiser"]', // come back to this -- doesn't detect ads
      'Artist': 'a[class="playbackSoundBadge__lightLink sc-link-light sc-link-secondary sc-truncate"]',
      'Title': 'a[class="playbackSoundBadge__titleLink sc-truncate"]',
      'Position': 'div[class="playbackTimeline__timePassed"] > span:nth-child(2)',
      'Duration': 'div[class="playbackTimeline__duration"] > span:nth-child(2)',
      'buttonVolume': 'div[class="volume__sliderWrapper"]',
      'buttonShuffle': 'button[class="shuffleControl sc-ir"]',
      'buttonLoop': 'button[class="repeatControl sc-ir m-none"]',
      'buttonPrevious': 'button[class="skipControl sc-ir playControls__control playControls__prev skipControl__previous"]',
      'buttonPause': 'button[aria-label="Pause current"]',
      'buttonPlay': 'button[aria-label="Play current"]',
      'buttonNext': 'button[class="skipControl sc-ir playControls__control playControls__next skipControl__next"',
      'buttonPlaylistPlay': 'div[class="soundTitle__playButton soundTitle__playButtonHero"]'
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
    console.debug('[JABA] Function [valuesStringify] Result [' + x + ']');
    return x;
  }

  valuesUpdate() {
    console.debug('[JABA] Function [valuesUpdate]');
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
		
	// Display information to console
    if (this.historyPrevious.toString() !== this.historyCurrent.toString()) {
      let stringInfo = `[JABA] Volume (${this.Volume}) Shuffle (${this.Shuffle}) Loop (${this.Loop}) | Artist (${this.Artist}) Track (${this.Title}) Position (${this.Position}) Duration (${this.Duration}) | isPlaying (${this.isPlaying}) isInactive (${this.isInactive})`
      console.info(stringInfo);
    }
  
  }
  
  // Callable Functions - Update Stats - Global Value
  getVolume() {
    return getElementBySelector(this.elementSelector.Volume).getAttribute('aria-valuenow') * 100;
  }
  getShuffle() {
    return getElementBySelector(this.elementSelector.Shuffle).getAttribute('class') === "shuffleControl sc-ir m-shuffling";
  }
  getLoop() {
    return getElementBySelector(this.elementSelector.Loop).getAttribute('class') === "repeatControl sc-ir m-one";
  }
  getIsPlaying() {
    return getElementBySelectors(this.elementSelector.isPlaying).length > 0;
  }
  getIsInactive() {
    return getElementBySelectors(this.elementSelector.isInactive).length === 0;
  }
  getAdvertisement() {
    return getElementBySelectors(this.elementSelector.Advertisement).length > 0;
  }

  // Callable Functions - Update Stats - Track-specific Values
  getArtist() {
    return getElementBySelector(this.elementSelector.Artist).getAttribute('title');
  }
  getTitle() {
    return getElementBySelector(this.elementSelector.Title).getAttribute('title');
  }
  getPosition() {
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Position).innerText);
  }
  getDuration() {
    return convertTime2Seconds(getElementBySelector(this.elementSelector.Duration).innerText);
  }

}
