var timerPlayback = {
  startDate: null,
  endDate: null,
  elapsedSeconds: 0,
  // Start
  start: function() {
    timerPlayback.startDate = new Date()
  },
  // Stop
  stop: function() {
    if (timerPlayback.startDate == null) { timerPlayback.startDate = new Date() }
    timerPlayback.endDate = new Date()
    let elapsedTime = 0
    elapsedTime = ( timerPlayback.endDate - timerPlayback.startDate )
    elapsedTime /= 1000
    timerPlayback.elapsedSeconds += Math.round(elapsedTime)
  },
  // Reset
  reset: function() {
    if (timerPlayback.endDate != null) {
      timerPlayback.stop()
    }
    timerPlayback.elapsedSeconds = 0
    timerPlayback.startDate = new Date()
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
