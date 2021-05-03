function playerSpotify (Volume, Shuffle, Loop, isPlaying, Position, Advertisement, Track)
	{
    
		this.elementSelectors = {
			'Volume':'button[aria-label="Change volume"]',
			'Shuffle':'button[data-testid="control-button-shuffle"]',
			'Loop':'button[data-testid="control-button-repeat"]',
			'isPlaying':'button[data-testid="control-button-pause"]',
			'Position':'div[data-testid="playback-position"]',
			'Advertisement':'a[data-testid="track-info-advertiser"]',
			'elementReady':'div[data-testid="playlist-tracklist"]',
			'elementContainer':'div[class="Root__now-playing-bar"]',
			'elementNowPlaying':'div[data-testid="now-playing-widget"]'
		}
    
		this.elementSelectors.Track = {
			'Artist':'div[data-testid="track-info-artists"]',
			'Title':'a[data-testid="nowplaying-track-link"]',
			'Duration':'div[data-testid="playback-duration"]'
		  }
    
		this.Volume = Volume;
		this.Shuffle = Shuffle;
		this.Loop = Loop;
		this.isPlaying = isPlaying;
		this.Position = Position;
		this.Advertisement = Advertisement;
		this.Track = function(Artist, Title, Duration)
			{
				this.Artist = Artist;
				this.Title = Title;
				this.Duration = Duration;
			}
      
		this.History = function(Previous, Current)
			{
				this.Previous = [''];
				this.Current = [''];
			}
      
		this.Controls = new playerControls();
    
	}

function playerUpdate (objP)
	{
    
		objP.History.Previous = [objP.Volume, objP.Shuffle, objP.Loop, objP.isPlaying, objP.Position, objP.Advertisement, objP.Track.Artist, objP.Track.Title, objP.Track.Duration];
			
		console.log('[JABA-DEBUG] Function (playerUpdate) History.Previous (' + objP.History.Previous + ')');
		
		objP.Volume = getElementBySelector(objP.elementSelectors.Volume)?.getAttribute('style').slice(6).split("%")[0].split(".")[0];
		objP.Shuffle = getElementBySelector(objP.elementSelectors.Shuffle).getAttribute('aria-checked') === "true";
		objP.Loop = getElementBySelector(objP.elementSelectors.Loop)?.getAttribute('aria-checked') === "mixed";
		objP.isPlaying = document.querySelectorAll(objP.Controls.elementSelectors.buttonPause).length > 0;
		objP.Position = getElementBySelector(objP.elementSelectors.Position)?.innerText;
		objP.Advertisement = document.querySelectorAll(objP.elementSelectors.Advertisement).length > 0;
		objP.Track.Artist = getElementBySelector(objP.elementSelectors.Track.Artist)?.innerText;
		objP.Track.Title = getElementBySelector(objP.elementSelectors.Track.Title)?.text;
		objP.Track.Duration = getElementBySelector(objP.elementSelectors.Track.Duration)?.innerText;

		objP.History.Current = [objP.Volume, objP.Shuffle, objP.Loop, objP.isPlaying, objP.Position, objP.Advertisement, objP.Track.Artist, objP.Track.Title, objP.Track.Duration];

		console.log('[JABA-DEBUG] Function (playerUpdate) History.Current (' + objP.History.Current + ')');
		
		if (objP.History.Current.toString() == objP.History.Previous.toString())
			{
				return
			}

		console.log('[JABA-INFO] Volume ' + objP.Volume);
		console.log('[JABA-INFO] Shuffle ' + objP.Shuffle);
		console.log('[JABA-INFO] Loop ' + objP.Loop);
		console.log('[JABA-INFO] isPlaying ' + objP.isPlaying);
		console.log('[JABA-INFO] Position ' + objP.Position);
		console.log('[JABA-INFO] Advertisement ' + objP.Advertisement);
		console.log('[JABA-INFO] Artist ' + objP.Track.Artist);
		console.log('[JABA-INFO] Title ' + objP.Track.Title);
		console.log('[JABA-INFO] Duration ' + objP.Track.Duration);

	}

function playerControls(Previous, Pause, Play, Next, Volume, Shuffle, Loop)
	{
		this.elementSelectors = {
			'buttonPrevious':'button[aria-label="Previous"]',
			'buttonPause':'button[data-testid="control-button-pause"]',
			'buttonPlay':'button[data-testid="control-button-play"]',
			'buttonNext':'button[data-testid="control-button-skip-forward"]',
			'buttonVolume':'button[aria-label="Change volume"]',
			'buttonShuffle':'button[data-testid="control-button-shuffle"]',
			'buttonLoop':'button[data-testid="control-button-repeat"]',
			'buttonPlaylistPlay':'button[data-testid="play-button"]'
		}
		this.Previous = function ()
			{ 
				console.log('[JABA] [Controls] Clicking Previous (' + this.elementSelectors.buttonPrevious + ')');
				getElementBySelector(this.elementSelectors.buttonPrevious).click();
				return null;
			}
		this.Pause = function ()
			{ 
				console.log('[JABA] [Controls] Clicking Pause (' + this.elementSelectors.buttonPause + ')');
				getElementBySelector(this.elementSelectors.buttonPause).click();
				return null;
			}
		this.Play = function ()
			{ 
				console.log('[JABA] [Controls] Clicking Play (' + this.elementSelectors.buttonPlay + ')');
				getElementBySelector(this.elementSelectors.buttonPlay).click();
				return null;
			}
		this.Next = function ()
			{ 
				console.log('[JABA] [Controls] Clicking Next (' + this.elementSelectors.buttonNext + ')');
				getElementBySelector(this.elementSelectors.buttonNext).click();
				return null;
			}
		this.Volume = function ()
			{ 
				console.log('[JABA] [Controls] Clicking Volume (' + this.elementSelectors.buttonVolume + ')');
				getElementBySelector(this.elementSelectors.buttonVolume).click();
				return null;
			}
		this.Shuffle = function ()
			{ 
				console.log('[JABA] [Controls] Clicking Shuffle (' + this.elementSelectors.buttonShuffle + ')');
				getElementBySelector(this.elementSelectors.buttonShuffle).click();
				return null;
			}
		this.Loop = function ()
			{ 
				console.log('[JABA] [Controls] Clicking Loop (' + this.elementSelectors.buttonLoop + ')');
				getElementBySelector(this.elementSelectors.buttonLoop).click();
				return null;
			}
		this.playlistPlay = function ()
			{ 
				console.log('[JABA] [Controls] Clicking Playlist Play (' + this.elementSelectors.buttonPlaylistPlay + ')');
				getElementBySelector(this.elementSelectors.buttonPlaylistPlay).click();
				return null;
			}
	}