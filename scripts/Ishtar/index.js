const Axios = require("axios");

let loreEntry = input => {
  let alteredInput = input
    .substr("9")
    .replace(/\s+/g, "-")
    .toLowerCase();
  return `https://ishtar-collective.net/entries/${alteredInput}`;
};

module.exports.loreEntry = loreEntry;
