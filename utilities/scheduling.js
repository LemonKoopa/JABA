function convertDate(date) { // convert Date object into a String
	var yyyy	= date.getFullYear().toString();
	var mm		= (date.getMonth()+1).toString();
	var dd		= date.getDate().toString();

	var mmChars	= mm.split('');
	var ddChars	= dd.split('');

	return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

function checkAlive(activeStart, activeStop) { // Here we go baby
	let dateCurrent  = new Date();
	let setStartTime = new Date(convertDate(dateCurrent) + " " + activeStart);
	let setStopTime  = new Date(convertDate(dateCurrent) + " " + activeStop);

    if (setStartTime <= dateCurrent && setStopTime >= dateCurrent) {
		return true;
	} else {
		return false;
	}
}
