// Testing Dependencies
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

// App Dependencies N/A
const halo = require('../scripts/Halo/halo');
const scripts = require('../scripts/scripts');

const date = new Date()
let month = scripts.curMonth()
let day = scripts.curDay()
let sheetExample = {
  "range": "Timeline!A11:G1047",
  "values": [
    [
      "500,000,000 BCE",
      "January",
      "03",
      "The Precursors accumulated their total knowledge in a vast reserve of rules and a library of experiences.",
      "",
      "Halo: Silentium page 208",
      "\"During our debate, the Gravemind hinted at a vast reserve of rules accumulated more than half a billion years ago, a huge library of experiences and disputes codified into the total wisdom of the Precursors.\""
    ],
    [
      "500,000,000 BCE",
      month,
      day,
      "The Precursors accumulated their total knowledge in a vast reserve of rules and a library of experiences.",
      "",
      "Halo: Silentium page 208",
      "\"During our debate, the Gravemind hinted at a vast reserve of rules accumulated more than half a billion years ago, a huge library of experiences and disputes codified into the total wisdom of the Precursors.\""
    ],
    [
      "500,000,000 BCE",
      "N/A",
      "03",
      "The Precursors accumulated their total knowledge in a vast reserve of rules and a library of experiences.",
      "",
      "Halo: Silentium page 208",
      "\"During our debate, the Gravemind hinted at a vast reserve of rules accumulated more than half a billion years ago, a huge library of experiences and disputes codified into the total wisdom of the Precursors.\""
    ],
    [
      "500,000,000 BCE",
      "N/A",
      "N/A",
      "The Precursors accumulated their total knowledge in a vast reserve of rules and a library of experiences.",
      "",
      "Halo: Silentium page 208",
      "\"During our debate, the Gravemind hinted at a vast reserve of rules accumulated more than half a billion years ago, a huge library of experiences and disputes codified into the total wisdom of the Precursors.\""
    ],
  ]
};
let values = sheetExample.values

describe('halo', function() {

  it('getMonthlyActivities() should return an array of filtered events matching the current month of the year', function() {
    const res = halo.getMonthlyActivities(values);

    expect(res).to.be.a('array');
    for (var i = 0; i < res.length; i++) {
      expect(res[i][1]).to.equal(scripts.curMonth());
    }
  })

  it('getDailyActivities() should return an array of filtered events from monthlyActivities that match the current day of the week or fire getNonMatchingEvents()', function(){
    const monthlyEvents = halo.getMonthlyActivities(values);
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
      halo.getNonMatchingEvents(values)
      expect(todayInHalo).to.be.empty;
    }
  })

  it('getNonMatchingEvents() should return an array of events containing "N/A" in the month and/or year column', function() {
    const nonMatchingEvents = [];
    let results = halo.getNonMatchingEvents(values);

    expect(results).to.be.a('array');

    for (var i = 0; i < results.length; i++) {
      let row = results[i];
      expect(row[1] || row[2]).to.equal("N/A");
    }
  })

  it('gatherMessage() should seperate the results before they are assembled, if they match curDay()', function() {
    let dailyEvents = halo.gatherMessage(values);

    expect(dailyEvents).to.not.be.empty
  })

  it('gatherMessage() does not return valid dailyEvents then it should gather nonMatchingEvents()', sinon.test(function() {
    const objExample = {
      "range": "Timeline!A11:G1047",
      "values": [
        [
          "500,000,000 BCE",
          "January",
          "03",
          "The Precursors accumulated their total knowledge in a vast reserve of rules and a library of experiences.",
          "",
          "Halo: Silentium page 208",
          "\"During our debate, the Gravemind hinted at a vast reserve of rules accumulated more than half a billion years ago, a huge library of experiences and disputes codified into the total wisdom of the Precursors.\""
        ]
      ]
    };
    let gather = halo.gatherMessage(objExample.values);
    let dailyEvents = halo.getDailyActivities(gather)

    expect(dailyEvents).to.be.empty
    expect(halo.getNonMatchingEvents(values)).isCalled
  }))

  // it('messageStructure() should assign the parts of the message if results are valid', function() {
  //
  //   let results = [
  //     "500,000,000 BCE",
  //     month,
  //     day,
  //     "The Precursors accumulated their total knowledge in a vast reserve of rules and a library of experiences.",
  //     "",
  //     "Halo: Silentium page 208",
  //     "\"During our debate, the Gravemind hinted at a vast reserve of rules accumulated more than half a billion years ago, a huge library of experiences and disputes codified into the total wisdom of the Precursors.\""
  //   ];
  //
  //   message = halo.messageStructure(results)
  //
  //   expect(message).to.be.a('array')
  //
  //   expect(message).to.include([
  //     '**__TODAY IN HALO__**'
  //     // "500,000,000 BCE"
  //     // scripts.curMonth(),
  //     // scripts.curDay(),
  //     // "The Precursors accumulated their total knowledge in a vast reserve of rules and a library of experiences.",
  //     // 'No HaloPedia Reference Found',
  //     // 'Halo: Silentium page 208',
  //     // "\"During our debate, the Gravemind hinted at a vast reserve of rules accumulated more than half a billion years ago, a huge library of experiences and disputes codified into the total wisdom of the Precursors.\""
  //   ])
  //   //expect(message).to.have.members([])
  // })

  it('messageConstruct() should contruct a message inside an array from the results of getDailyActivities() or throw an Error', function() {
    const objExample = {
      "range": "Timeline!A11:G1047",
      "values": [
        [
          "500,000,000 BCE",
          "January",
          "03",
          "The Precursors accumulated their total knowledge in a vast reserve of rules and a library of experiences.",
          "",
          "Halo: Silentium page 208",
          "\"During our debate, the Gravemind hinted at a vast reserve of rules accumulated more than half a billion years ago, a huge library of experiences and disputes codified into the total wisdom of the Precursors.\""
        ]
      ]
    };
    let message = halo.messageConstruct(objExample.values);

    expect(message).to.be.a('array');

  })

})
