'use strict'

const scripts = require('./scripts');
const date = new Date();
var msg;
var thisMonthInHalo = [];
var nonMatchingEvents = [];
var todayInHalo = [];

function filterMonthlyHaloEvents(data) {
  return data[1] == scripts.curMonth();
}

function filterDailyHaloEvents(data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i][2] == scripts.curDay()) {
      return data[i];
    }
  }

}

function getMonthlyActivities(spreadsheet) {
  return spreadsheet.filter(filterMonthlyHaloEvents);
}

function getDailyActivities(spreadsheet) {

  // We now have an array with activities for the current month.
  var monthlyActivities = getMonthlyActivities(spreadsheet);
  return filterDailyHaloEvents(monthlyActivities);

}

function getNonMatchingEvents(list) {
  // Make sure array is empty before adding to it
  nonMatchingEvents = [];
  for (var i = 0; i < list.length; i++) {
    var row = list[i];
    if (row[1] | row[2] == "N/A") {
      nonMatchingEvents.push(row);
    }
  }
  return nonMatchingEvents;
}

function messageConstruct(spreadsheet) {
  var cannon = getDailyActivities(spreadsheet);
  var year, month, day, pageSource, infoOrigin, notes;
  var message = [];
  var result = [];

  // Check if we have matching events for today
  if (cannon.length > 0) {

    for (var i = 0; i < cannon.length; i++) {
      result.push(cannon[i]);
    }

    message.push('**__TODAY IN HALO__**');

    // If not, gather a random event
  }else {

    var result = scripts.randomQuote(nonMatchingEvents);

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
