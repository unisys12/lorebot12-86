// Contains ishtar-collective related Tests
'use strict'

const expect = require('chai').expect;
const destiny = require('../scripts/Destiny/destiny');
const Ishtar = require('../scripts/Ishtar')

describe('IshtarTests', function() {

  it('searchGrimoire() should return a string containing a url to ishtar parsed with user input', function() {
    const input = '!search toland the shattered'
    const expected = 'http://www.ishtar-collective.net/search/' + encodeURIComponent('toland the shattered')
    let actual = destiny.searchGrimoire(input)

    expect(actual).to.be.equal(expected);
  })

  it('searchCard() should return a string containing a url to ishtar parsed with user input', function() {
    const input = '!card bad juju'
    const expected = 'http://www.ishtar-collective.net/cards/bad-juju'
    let actual = destiny.searchCard(input)

    expect(actual).to.be.equal(expected);
  })

  it('loreEntry() should return a string containing a url to Ishtar parsed with user input', function() {
    const input = '!entries ace of spades'
    const expected = 'https://ishtar-collective.net/entries/ace-of-spades'
    let actual = Ishtar.loreEntry(input)

    expect(actual).to.be.equal(expected)
  })

})
