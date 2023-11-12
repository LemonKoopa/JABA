// ==UserScript==
// @name     Spotify - JABA [Actions Off]
// @version  1
// @run-at   document-start
// @grant    GM.xmlHttpRequest
// @grant    GM.setValue
// @grant    GM.getValue
// @grant    metadata
// @require  https://raw.githubusercontent.com/uzairfarooq/arrive/master/minified/arrive.min.js
// @require  https://raw.githubusercontent.com/LemonKoopa/JABA/main/utilities/dom.js
// @require  https://raw.githubusercontent.com/LemonKoopa/JABA/main/utilities/scheduling.js
// @require  https://raw.githubusercontent.com/LemonKoopa/JABA/main/utilities/time.js
// @require  https://raw.githubusercontent.com/LemonKoopa/JABA/main/utilities/statistics.js
// @require  https://raw.githubusercontent.com/LemonKoopa/JABA/main/modules/_generic.js
// @require  https://raw.githubusercontent.com/LemonKoopa/JABA/main/modules/_logic.js
// @require  https://raw.githubusercontent.com/LemonKoopa/JABA/main/modules/apple.js
// @require  https://raw.githubusercontent.com/LemonKoopa/JABA/main/modules/spotify.js
// @require  https://raw.githubusercontent.com/LemonKoopa/JABA/main/modules/soundcloud.js
// @include  https://soundcloud.com/*/sets/*
// @include  https://open.spotify.com/playlist/*
// @exclude  https://open.spotify.com/album/*
// @exclude  https://open.spotify.com/artist/*
// @include  https://music.apple.com/library/playlist/*
// @include  https://music.apple.com/us/playlist/*
// @exclude  https://music.apple.com/us/artist/*
// @exclude  https://music.apple.com/us/album/*
// ==/UserScript==

// Change module depending on location
if (window.location.href.includes('music.apple.com'))  { objPlayer = new playerApple() }
if (window.location.href.includes('open.spotify.com')) { objPlayer = new playerSpotify() }
if (window.location.href.includes('soundcloud.com'))   { objPlayer = new playerSoundCloud() }

let playerStatistics = new Statistics()
//// Disable debug level console logging
//console.debug = function(){}

function main()
{

  console.info('[JABA] Loaded')

  function updateState(mutations)
  {

    let objHistory = {
      'Artist': objPlayer.history.Artist, 
      'Title': objPlayer.history.Title, 
      'Duration': objPlayer.history.Duration 
    }
    
    objPlayer.valuesUpdate()

    let currentAction = objPlayer.currentAction()
    if (currentAction != '[currentAction] ') {
      console.info(`[JABA] ${currentAction}`)

      if ( currentAction.includes('Status: Track Change') ) {
        timerPlayback.stop()
      }


      if ( currentAction.includes('Status: Playing') ) {
        timerPlayback.start()
      }

      if ( currentAction.includes('Status: Paused') ) {
        timerPlayback.stop()
      }
      
      if ( currentAction.includes('Request: Update statistics') ) {
        playerStatistics.addEvent(objHistory.Artist, objHistory.Title, objHistory.Duration, timerPlayback.elapsedSeconds)
        timerPlayback.reset()
      }

      if ( currentAction.includes('Request: Upload to cloud') ) {
        playerStatistics.upload()
      }

    } 

  }

  function startObserving()
  {
    const observer = new MutationObserver(updateState)
    const observerConfig = { 
      attributeFilter: [ 'aria-checked', 'aria-valuenow', 'aria-valuemax', 'aria-label', 'title', 'class' ],
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    }

    observer.observe( document.querySelector(objPlayer.elementSelector.elementNowPlaying), observerConfig )
 
    objPlayer.valuesUpdate() // Initial Update of Stats

  }
  
  setTimeout(startObserving, 2500)
  
}

document.arrive ( objPlayer.elementSelector.elementReady, main )
