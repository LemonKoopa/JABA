// let playerStatistics = new Statistics()
// playerStatistics.addEvent('Artist Name', 'Track Title', Duration, Position when skipped)

class Statistics {
  constructor() {
    // Create object array template
    this.data = {
      "Metrics": {
        "Plays": 0,
        "Time": 0,
        "Skips": 0,
        "Pauses": 0,
        "Completed": 0,
        "Advertisements": 0,
        "Refreshes": 0,
        "Calculated": {
          "Skip": 0,
          "Completion": 0,
          "Paused": 0,
          "Advertisement": 0
        },
        "Tracks": [
          //{
          //  "Artist": "",
          //  "Title": "",
          //  "Duration": "",
          //  "PlayTime": "",
          //  "Completion": ""
          //  "Timestamp": ""
          //},
        ]
      }
    }
    this.length = 0
  }

  addEvent(Artist, Title, Duration, PlayTime) {
    // Calculate percentage of track played
    let percentPlayed = +(PlayTime / Duration * 100).toFixed(2)
    if (percentPlayed >= 99) {
      percentPlayed = 100
    }
    // Calculate if played to completion or skipped
    let wasSkipped = (percentPlayed !== 100)
    // Create a Date timestamp
    let thisDate = new Date().toISOString()
    // Push the track information to the statistics
    this.data.Metrics.Tracks.push({
      Artist: Artist,
      Title: Title,
      Duration: Duration,
      PlayTime: PlayTime,
      Completion: percentPlayed,
      Skipped: wasSkipped,
      Timestamp: thisDate
    })
    // Add to Global Metrics
    // Add to Global Metrics - Skips
    if (!!wasSkipped) {
      this.data.Metrics.Skips += 1
    } else {
      this.data.Metrics.Completed += 1
    }
    // Add to Global Metrics - Plays
    this.data.Metrics.Plays += 1
    // Add to Global Metrics - Time
    this.data.Metrics.Time += parseInt(PlayTime)
    // Add Calculated values
    this.data.Metrics.Calculated.Completion = +(this.statsCompletion())
  }

  // Functions - Array
  getElementAtIndex(index) {
    return this.data[index]
  }
  
  push(element) {
    this.data[this.length] = element
    this.length++
    return this.length
  }
  
  pop() {
    const item = this.data[this.length - 1]
    delete this.data[this.length - 1]
    this.length--
    return this.data
  }
  
  deleteAt(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1]
    }
    delete this.data[this.length - 1]
    this.length--
    return this.data
  }
  
  insertAt(item, index) {
    for (let i = this.length; i >= index; i--) {
      this.data[i] = this.data[i - 1]
    }
    this.data[index] = item
    this.length++
    return this.data
  }

  Stringify() {
    return JSON.stringify(this.data)
  }

  statsCompletion() {
    let completionTotal = 0
    let completionPercent = 0
    this.data.Metrics.Tracks.forEach(entry => {
      let entryCompletion = entry.Completion
      completionTotal += entryCompletion
    })
    completionPercent = (completionTotal / this.data.Metrics.Tracks.length).toFixed(2)
    return completionPercent
  }

}
