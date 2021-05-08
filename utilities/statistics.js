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
    let percentPlayed = PlayTime / Duration * 100
    if (percentPlayed >= 99) {
      percentPlayed = 100
    }
    // Calculate if played to completion or skipped
    let wasSkipped = (percentPlayed !== 100)
    // Push the above to the statistics
    if (!!wasSkipped) {
      this.data.Metrics.Skips += 1
    } else {
      this.data.Metrics.Completed += 1
    }
    // Add counts to Global Metrics
    this.data.Metrics.Plays += 1
    this.data.Metrics.Time += parseInt(PlayTime)
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

}
