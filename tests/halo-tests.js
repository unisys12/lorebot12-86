// Testing Dependencies
const chai = require('chai');
const expect = chai.expect;

// App Dependencies N/A
const halo = require('../scripts/halo');
const scripts = require('../scripts/scripts');

describe('halo', function() {

  it('getMonthlyActivities() should return an array of filtered events matching the current month of the year', function() {
    const spreadsheet = require('./testData/sheetresponse');
    const values = spreadsheet.values;
    const res = halo.getMonthlyActivities(values);

    expect(res).to.be.a('array');
    for (var i = 0; i < res.length; i++) {
      expect(res[i][1]).to.equal(scripts.curMonth());
    }
  })

  it('getDailyActivities() should return an array of filtered events from monthlyActivities that match the current day of the week', function(){
    const spreadsheet = require('./testData/sheetresponse');
    const events = spreadsheet.values;
    const monthlyEvents = halo.getMonthlyActivities(events);
    const dailyEvents = halo.getDailyActivities(monthlyEvents);
    const todayInHalo = [];
    const nonMatchingEvents = [];

    if (dailyEvents) {
      expect(nonMatchingEvents).to.be.empty;
      expect(todayInHalo).to.be.empty;

      for (var i = 0; i < todayInHalo.length; i++) {
        expect(todayInHalo[i][2]).to.equal(scripts.curDay());
      }
    }else{
      expect(todayInHalo).to.be.empty;
    }
  })

  it('getNonMatchingEvents() should return an array of events containing "N/A" in the month and/or year column', function() {
    const spreadsheet = require('./testData/sheetresponse');
    const nonMatchingEvents = [];
    let results = halo.getNonMatchingEvents(spreadsheet);
    expect(results).to.be.a('array');
  })

})
