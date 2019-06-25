const chai = require("chai");
const expect = chai.expect;
const scripts = require("../scripts/scripts");

describe("scripts", function() {
  it("normalizeCardInput() should make all characters lowercase, strip colons and replace spaces with a dash", function() {
    let testString = "Ghost Fragment: Legends";
    expect(scripts.normalizeCardInput(testString)).to.equal(
      "ghost-fragment-legends"
    );
  });

  it("normalizeItemInput() should make all characters lowercase, strip semi-colons and replace spaces with a dash", function() {
    let testString = "Saint-14's Ring";
    expect(scripts.normalizeItemInput(testString)).to.equal("saint-14s-ring");
  });

  it("randomQuote() should return a random index from an Object", function() {
    const quotes = require("./TestData/petra");
    const quoteOne = scripts.randomQuote(quotes);
    const quoteTwo = scripts.randomQuote(quotes);
    expect(quoteOne).to.not.equal(quoteTwo);
  });

  it("curDay() should return the current day", function() {
    const date = new Date();
    const CurrentDay = date.getDate();
    const day = scripts.curDay();
    expect(day).to.equal(CurrentDay);
  });

  it("curMonth() should return the current month as a string", function() {
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
    expect(currentTestMonth).to.be.a("string");
    expect(scriptMonth).to.equal(currentTestMonth);
  }),
    it("esMonths() should return the in-game version of the current month as a string", function() {
      const date = new Date();
      const TestMonth = date.getMonth();
      switch (TestMonth) {
        case 0:
          return "Morning Star";
          break;
        case 1:
          return "Sun's Dawn";
          break;
        case 2:
          return "First Seed";
          break;
        case 3:
          return "Rain's Hand";
          break;
        case 4:
          return "Second Seed";
          break;
        case 5:
          return "Mid Year";
          break;
        case 6:
          return "Sun's Height";
          break;
        case 7:
          return "Last Seed";
          break;
        case 8:
          return "Hearthfire";
          break;
        case 9:
          return "Frostfall";
          break;
        case 10:
          return "Sun's Dusk";
          break;
        case 11:
          return "Evening Star";
          break;
        default:
          "";
          break;
      }
    });
});
