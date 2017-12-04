const scripts = require('../scripts')
const google = require('googleapis')
const sheet = google.sheets('v4')

module.exports = (()=>{

  filterMonthlyEsEvents = (data) => {
    return data[1] == scripts.esMonths()
  }
  
  filterDailyEsEvents = (data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i][2] == scripts.curDay()) {
        return data[i]
      }
    }
  }
  
  getMonthlyActivities = (spreadsheet) => {
    return spreadsheet.filter(filterMonthlyEsEvents)
  }
  
  getDailyActivities = (rows) => {
    // We now have an array with activities for the current month.
    let monthlyActivities = getMonthlyActivities(rows)
    return filterDailyEsEvents(monthlyActivities)
  }
  
  getNonMatchingEvents = (list) => {
    // Make sure array is empty before adding to it
    nonMatchingEvents = []
    for (var i = 0; i < list.length; i++) {
      let row = list[i]
      if (row[1] | row[2] == "" || "N/A") {
        nonMatchingEvents.push(row)
      }
    }
    return nonMatchingEvents
  }
  
  gatherMessage = (rows) => {
  
    let cannon = getDailyActivities(rows)
    let result = []
  
    // Check if we have matching events for today
    if (cannon !== undefined) {
  
      for (var i = 0; i < cannon.length; i++) {
        result.push(cannon[i])
      }

      return messageStructure(result)
  
    }else {
  
      let nonMatching = getNonMatchingEvents(rows)
      let result = scripts.randomQuote(nonMatching)

      return messageStructure(result)
  
    }
  }
  
  messageStructure = (gather) => {
    let messageDetails = []
    let year, month, day, pageSource, infoOrigin, notes
  
    try {
  
      if (gather[0] == 'N/A' || '') {
        year = '__Unknown__'
      }else{
        year = gather[0]
      }
  
      messageDetails.push(year)
  
      if (gather[1] == 'N/A' || '') {
        month = '__Unknown__'
      }else{
        month = gather[1]
      }
  
      messageDetails.push(month)
  
      if (gather[2] == 'N/A' || '') {
        // If date is not present, we know this is a random event
        messageDetails.push('**__RANDOM ELDER SCROLLS CANON__**')
        day = '__Unknown__'
      }else{
        messageDetails.push('**__TODAY IN ELDER SCROLLS__**')
        day = gather[2]
      }
  
      messageDetails.push(day)
  
      // gather[3] is the event name
      messageDetails.push(gather[3])
  
      // if (gather[4]) {
      //   pageSource = gather[4]
      // }else{
      //   pageSource = 'No References Found'
      // }
  
      messageDetails.push(pageSource)
  
      if (gather[5]) {
        infoOrigin = gather[5]
      }else{
        infoOrigin = 'Information Origin Not Applicable'
      }
  
      messageDetails.push(infoOrigin)
  
      if (gather[6]) {
        notes = gather[6]
      }else {
        notes = 'No Notes Found on Selected Reference'
      }
  
      messageDetails.push(notes)
  
    } catch (e) {
  
      throw( new Error('There was a problem with the details of your results: ' + e) )
  
    } finally {
  
      return messageConstruct(messageDetails)
  
    }
  
  }
  
  messageConstruct = (rows) => {
  
    let message = []

    if(rows[7].includes('- ')){
      rows[7].replace('- ', '\/n- ')
    }
  
      try {
  
        let content = rows[2] + '\n'+'\n' +
            '**Year:** ' + rows[0] + '\n' +
            '**Month:** '+ rows[1] + '\n' +
            '**Day:** ' + rows[3] + '\n' + '\n' +
            '*' + rows[4] + '*' + '\n' + '\n' +
            // '**Source:** ' + rows[5] + '\n' +
            '**Info Origin:** ' + rows[6] + '\n' +
            '**Notes:** ' + rows[7] + '\n'
  
        message.push(content)
  
        // Returns the messge that will be sent to chat window
        return message
  
      } catch (e) {
  
        throw( new Error('There was an error assembling your message: ' + e) )
  
      }
  
  }

  ElderScrolls = function(cb){
    sheet.spreadsheets.values.get({
    key: process.env.googleSheetsKey,
    spreadsheetId: process.env.elderScrollsSheetID,
    range: process.env.elderScrollsSheetRange
    }, function (err, response) {
      if (err) {
        return cb(new Error('Error accessing spreadsheet', err))
      } else {
        let rows = response.values
        if (rows.length == 0) {
          return cb(new Error("No rows found! Something happend to the spreadsheet!!"))
        } else {
          return cb(null, gatherMessage(rows))
        }
      }
    })
  }

  return {
    ElderScrolls: ElderScrolls
  }

})()