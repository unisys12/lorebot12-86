const chai = require('chai');
const expect = chai.expect;
const scripts = require('../scripts/scripts');

describe('scripts', function() {
  it('normalizeCardInput() should make all characters lowercase, strip colons and replace spaces with a dash', function(){
    let testString = "Ghost Fragment: Legends";
    expect(scripts.normalizeCardInput(testString)).to.equal("ghost-fragment-legends");
  })
})

describe('scripts', function() {
  it('normalizeItemInput() should make all characters lowercase, strip colons and replace spaces with a dash', function(){
    let testString = "Saint-14's Ring";
    expect(scripts.normalizeItemInput(testString)).to.equal("saint-14s-ring");
  })
})

describe('scripts', function() {
  it('randomQuote() should return a random index from an Object', function() {
    const quotes = require('./testData/cayde');
    const quoteOne = scripts.randomQuote(quotes);
    const quoteTwo = scripts.randomQuote(quotes);
    expect(quoteOne).to.not.equal(quoteTwo);
  })
})

describe('scripts', function() {
  it('curDay() should return the current day', function() {
    const date = new Date();
    const CurrentDay = date.getDate();
    const day = scripts.curDay();
    expect(day).to.equal(CurrentDay);
  })
})

describe('scripts', function() {
  it('curMonth() should return the current month as a string', function() {
    const date = new Date();
    const TestMonth = date.getMonth();
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
    const currentTestMonth = months[TestMonth];
    const scriptMonth = scripts.curMonth();
    expect(currentTestMonth).to.be.a('string');
    expect(scriptMonth).to.equal(currentTestMonth);
  })
})
