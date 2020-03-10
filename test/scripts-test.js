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
});
