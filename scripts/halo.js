'use strict'

const scripts = require('./scripts');
const date = new Date();
var thisMonthInHalo = [];
var todayInHalo = [];
var nonMatchingEvents = [];
var msg;

function getMonthlyActivities(spreadsheet) {
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
  // Check for Monthly Activities
  if (thisMonthInHalo.length == 0) {
    getMonthlyActivities(spreadsheet);
  }
  // Iterate over the monthly array to find any matching days
  for (var i = 0; i < thisMonthInHalo.length; i++) {
    // Represents a single row instance
    var row = thisMonthInHalo[i];
    if (row[2] == scripts.curDay()) {
      // If so, push them into a daily array to be returned
      todayInHalo.push(row);
    }else{
      nonMatchingEvents.push(row);
    }
  }
  return todayInHalo;
}

function getNonMatchingEvents(list) {
  for (var i = 0; i < list.length; i++) {
    var row = list[i];
    if (row[1] || row[2] == "N/A") {
      nonMatchingEvents.push(row);
    }
  }
  return nonMatchingEvents;
}

module.exports.getMonthlyActivities = getMonthlyActivities;
module.exports.getDailyActivities = getDailyActivities;
module.exports.getNonMatchingEvents = getNonMatchingEvents;
module.exports.thisMonthInHalo = thisMonthInHalo;
module.exports.todayInHalo = todayInHalo;
module.exports.nonMatchingEvents = nonMatchingEvents;
