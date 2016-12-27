'use strict'

const scripts = require('./scripts');
const date = new Date();
var msg;
var thisMonthInHalo = [];
var nonMatchingEvents = [];

function getMonthlyActivities(spreadsheet) {
  var thisMonthInHalo = [];
  // var monthFilter = spreadsheet.filter(scripts.filterMonthlyHaloEvents);
  // console.log("Monthly Events: ", monthFilter);
  // Pass in the "list" of cell values, iterate over them and assign them to a var
  for (var i = 0; i < spreadsheet.length; i++) {
    // Represents a single row instance
    var row = spreadsheet[i];
    // Compare month values against current month.
    if (row[1] == scripts.curMonth()) {
      // If we find a match, push it into the monthly array
      thisMonthInHalo.push(row);
    }
    nonMatchingEvents.push(row);
  }
}

function getDailyActivities(spreadsheet) {
  var todayInHalo = [];
  // Check for Monthly Activities
  if (thisMonthInHalo.length == 0) {
    getMonthlyActivities(spreadsheet);
  }
  // Iterate over the monthly array to find any matching days
  for (var i = 0; i < thisMonthInHalo.length; i++) {
    // Represents a single row instance from the current month
    var row = thisMonthInHalo[i];
    // Check if each row from the month matches the current day
    if (row[2] == scripts.curDay()) {
      // If so, push them into a daily array to be returned
      todayInHalo.push(row);
      console.log('Today In Halo: ', todayInHalo);
    }else{
      nonMatchingEvents.push(row);
    }
  }
  // Reintialize to an empty array for next time bot cycles through
  thisMonthInHalo = [];
  return todayInHalo;
}

function getNonMatchingEvents(list) {
  // Make double array is empty before adding to it
  nonMatchingEvents = [];
  for (var i = 0; i < list.length; i++) {
    var row = list[i];
    if (row[1] || row[2] == "N/A") {
      nonMatchingEvents.push(row);
    }
  }
  return nonMatchingEvents;
}

function messageConstruct(rows) {
  var cannon = getDailyActivities(rows);
  var year, month, day, pageSource, infoOrigin, notes;
  var message = [];
  var result = [];

  // Check if we have matching events for today
  if (cannon.length > 0) {

    for (var i = 0; i < todayInHalo.length; i++) {
      result = todayInHalo[i];
    }

    message.push('**__TODAY IN HALO__**' + '\n');

    // If not, gather a random event
  }else {

    var randomList = getNonMatchingEvents(rows);
    var result = scripts.randomQuote(randomList);

    message.push('**__RANDOM HALO CANNON__**');

  }

  if (result[0] == 'N/A') {
    year = '__Unknown__'
  }else{
    year = result[0];
  }

  if (result[1] == 'N/A') {
    month = '__Unknown__'
  }else{
    month = result[1];
  }

  if (result[2] == 'N/A') {
    day = '__Unknown__'
  }else{
    day = result[2];
  }

  // result[3] is the text of the result

  if (result[4]) {
    pageSource = result[4]
  }else{
    pageSource = 'No HaloPedia Reference Found'
  }

  if (result[5]) {
    infoOrigin = result[5]
  }else{
    infoOrigin = 'Information Origin Not Applicable'
  }

  if (result[6]) {
    notes = result[6]
  }else {
    notes = 'No Notes Found on Selected Reference'
  }

  var content = '\n'+'\n' + '**Year:** ' + year + '\n' +
  '**Month:** '+ month + '\n' +
  '**Day:** ' + day + '\n' + '\n' +
  '*' + result[3] + '*' + '\n' + '\n' +
  '**HaloPedia Ref:** ' + pageSource + '\n' +
  '**Info Origin:** ' + infoOrigin + '\n' +
  '**Notes:** ' + notes + '\n';

  message.push(content);

  return message;
}

module.exports.getMonthlyActivities = getMonthlyActivities;
module.exports.getDailyActivities = getDailyActivities;
module.exports.getNonMatchingEvents = getNonMatchingEvents;
module.exports.messageConstruct = messageConstruct;
