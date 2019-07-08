// Contains Destiny Related Tests
"use strict";

const expect = require("chai").expect;
const sinon = require("sinon");
const destiny = require("../scripts/Destiny/destiny");
const quotes = require("../scripts/quotes");

describe("DestinyTests", function() {
  it("help() should return a markdown formated string of text", function() {
    expect(destiny.help()).to.be.a("string");
  });

  it(
    "should retrun a list of quotes for an NPC related to a tag or subject",
    sinon.test(function() {
      const npcQuotes = require("../scripts/quotes.js");
      const input = "!quotes petra -tag queen";
      let npc, tag;

      // Captures all of users input
      let query = input.substr("8").toLowerCase();

      expect(query).to.be.eql("petra -tag queen");

      // Find if Tag is present, represents the "-" in "-tag"
      let tagIndex = query.indexOf("-tag");
      expect(tagIndex).to.be.eql(6);

      // Intialize NPC to act as though no tag is entered
      npc = query.substr(0);
      expect(npc).to.be.eql("petra -tag queen");

      if (tagIndex > 0) {
        // Tag is present, represents tag
        tag = query.substr(tagIndex + 5);
        expect(tag).to.be.eql("queen");

        npc = query.substring(0, tagIndex - 1);
        expect(npc).to.be.eql("petra");
      }

      let quotesStub = this.stub(destiny, "quotes");
      let processStub = this.stub(npcQuotes, "processNpcQuotes");

      quotesStub.withArgs(input);
      expect(processStub.called);
      expect(processStub.withArgs(npc));
      expect(processStub.withArgs(tag));
    })
  );
});
