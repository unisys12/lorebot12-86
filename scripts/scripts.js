'use strict'

const date = new Date();

module.exports = {

// Utility Functions for Bot.js

/**
  * normalizes input from chat for grimoire card searches
  * - converts all characters to lowercase
  * - removes any colons found in chat input
  * - removes any spaces and replaces with slug "-"
  */
normalizeCardInput: function (msg) {
    var lowercaseify = msg.toLowerCase();
    var removeColon = lowercaseify.replace(":", "");
    var output = removeColon.replace(/\s+/g, "-");

    return output;
},

/**
  * Normalizes input from chat for item searches
  * - converts all characters to lower case
  * - removes any semi-colons
  * - removes any spaces and replaces with slug "-"
  */
normalizeItemInput: function (msg) {
    var lowercaseify = msg.toLowerCase();
    var stripApostrophe = lowercaseify.replace("'", "");
    var output = stripApostrophe.replace(/\s+/g, "-");

    return output;
},

/**
  * very poor method of checking file type.
  */
filetype: function (file) {
    var jpg = file.endsWith('.jpg');
    var gif = file.endsWith('.gif');

    if (jpg) {
        return ".jpg";
    } else {
        return ".gif";
    };
},

/**
  * Reads array of quotes and picks one at random
  */
randomQuote: function (list) {
    return list[Math.round(Math.random()*(list.length-1))];
},

// Returns the current day of the week
curDay: function() {
  return date.getDate();
},
// Returns the current of month of the year
curMonth: function() {
  const month = date.getMonth();
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
  ];
  return months[month];
},

findHaloChannel: function(channel) {
  return channel.name == 'general'//'halo__lore'
},

filterMonthlyHaloEvents: function(spreadsheet) {
  //console.log(this.curMonth());
  return spreadsheet == this.curMonth();
}

}
