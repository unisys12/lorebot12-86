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
    return msg.toLowerCase()
              .replace(":", "")
              .replace(/\s+/g, "-")
},

/**
  * Normalizes input from chat for item searches
  * - converts all characters to lower case
  * - removes any semi-colons
  * - removes any spaces and replaces with slug "-"
  */
normalizeItemInput: function (msg) {
    return msg.toLowerCase()
              .replace("'", "")
              .replace(/\s+/g, "-")
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

  switch (date.getMonth()) {
    case 0:
      return 'Morning Star'
      break;
    case 1:
      return "Sun's Dawn"
      break;
    case 2:
      return "First Seed"
      break;
    case 3:
      return "Rain's Hand"
      break;
    case 4:
      return 'Second Seed'
      break;
    case 5:
      return 'Mid Year'
      break;
    case 6:
      return "Sun's Height"
      break;
    case 7:
      return 'Last Seed'
      break;
    case 8:
      return 'Hearthfire'
      break;
    case 9:
      return 'Frostfall'
      break;
    case 10:
      return "Sun's Dusk"
      break;
    case 11:
      return 'Evening Star'
      break;
    default: ""
      break;
  }
  
}

}
