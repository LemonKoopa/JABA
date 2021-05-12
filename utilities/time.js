var timerPlayback = {
  // Tick
  timer: null, // timer object
  now: 0, // current elapsed time
  tick: function() {
    timerPlayback.now++
  },
  // Start
  start: function() {
    timerPlayback.timer = setInterval(timerPlayback.tick, 1000)
  },
  // Stop
  stop: function() {
    clearInterval(timerPlayback.timer);
    timerPlayback.timer = null
  },
  // Reset
  reset: function() {
    if (timerPlayback.timer != null) {
      timerPlayback.stop()
    }
    timerPlayback.now = -1
    timerPlayback.tick()
  }
}

function convertTime2Seconds (Time)	{
  try
	{
	  let strTime = Time.split(':') // Split by : in MM:SSSS:MSMSMS Format
	  let strMinutes = parseInt(strTime[0] * 60) // Convert minutes to seconds
	  let strSeconds = parseInt(strTime[1].substring(0,2)) // Truncate seconds to first 2 digits
	  return (strMinutes + strSeconds)
	}
  catch (error)
	{
		return Time

	}
}
