function convertTime2Seconds (Time)
	{
  
  let strTime = Time.split(':'); // Split by : in MM:SSSS:MSMSMS Format
  let strMinutes = parseInt(strTime[0] * 60); // Convert minutes to seconds
  let strSeconds = parseInt(strTime[1].substring(0,2)); // Truncate seconds to first 2 digits
  return (strMinutes + strSeconds);
  
  }