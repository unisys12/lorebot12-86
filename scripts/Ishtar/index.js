const Axios = require('axios')

let testEntry = (query) => {
  let response = Axios.get(`http://ishtar-collective.net/entries/${query}`)
    .catch((e) => e)

  return response
}

module.exports.testEntry = testEntry
