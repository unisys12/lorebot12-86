// Contains ishtar-collective related Tests
'use strict'

const expect = require('chai').expect;
const destiny = require('../scripts/Destiny/destiny');

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

  it('searchItems() should return a string containing a url to ishtar parsed with user input', function() {
    const input = '!item bad juju'
    const expected = 'http://www.ishtar-collective.net/items/bad-juju'
    let actual = destiny.searchItems(input)

    expect(actual).to.be.equal(expected)
  })

})
