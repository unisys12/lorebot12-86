// Contains Destiny Related Tests
'use strict'

const expect = require('chai').expect;
const destiny = require('../../scripts/Destiny/destiny');

describe('DestinyTests', function() {

  it('help() should return a markdown formated string of text', function() {
    expect(destiny.help()).to.be.a('string')
  })

})
