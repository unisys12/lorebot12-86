'use strict'

const date = new Date()

module.exports = {

// Utility Functions for Bot.js

/**
  * normalizes input from chat for grimoire card searches
  * - converts all characters to lowercase
  * - removes any colons found in chat input
  * - removes any spaces and replaces with slug "-"
  */
normalizeCardInput: function (msg) {
    let lowercaseify = msg.toLowerCase()
    let removeColon = lowercaseify.replace(":", "")
    let output = removeColon.replace(/\s+/g, "-")

    return output
},

/**
  * Normalizes input from chat for item searches
  * - converts all characters to lower case
  * - removes any semi-colons
  * - removes any spaces and replaces with slug "-"
  */
normalizeItemInput: function (msg) {
    let lowercaseify = msg.toLowerCase()
    let stripApostrophe = lowercaseify.replace("'", "")
    let output = stripApostrophe.replace(/\s+/g, "-")

    return output
},

/**
  * Reads array of quotes and picks one at random
  */
randomQuote: function (list) {
    return list[Math.round(Math.random()*(list.length-1))]
},

// Returns the current day of the week
curDay: function() {
  return date.getDate()
},

// Returns the current of month of the year
curMonth: function() {
  let month = date.getMonth()
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  return months[month]
},

esMonths: function(month) {

  let normMonth = this.curMonth()

  switch (normMonth) {
    case 'January':
      return 'Morning Star'
      break;
    case 'February':
      return "Sun's Dawn"
      break;
    case 'March':
      return "First Seed"
      break;
    case 'April':
      return "Rain's Hand"
      break;
    case 'May':
      return 'Second Seed'
      break;
    case 'June':
      return 'Mid Year'
      break;
    case 'July':
      return "Sun's Height"
      break;
    case 'August':
      return 'Last Seed'
      break;
    case 'September':
      return 'Hearthfire'
      break;
    case 'October':
      return 'Frostfall'
      break;
    case 'November':
      return "Sun's Dusk"
      break;
    case 'December':
      return 'Evening Star'
      break;
    default: ""
      break;
  }
  
}

}
