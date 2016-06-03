// Utility Functions for Bot.js

/**
  * normalizes input from chat for grimoire card searches
  * - converts all characters to lowercase
  * - removes any colons found in chat input
  * - removes any spaces and replaces with slug "-"
  */
function normalizeCardInput(msg) {
    var lowercaseify = msg.toLowerCase();
    var removeColon = lowercaseify.replace(":", "");
    var output = removeColon.replace(/\s+/g, "-");

    return output;    
}

/** 
  * Normalizes input from chat for item searches
  * - converts all characters to lower case
  * - removes any semi-colons
  * - removes any spaces and replaces with slug "-"
  */
function normalizeItemInput(msg) {
    var lowercaseify = msg.toLowerCase();
    var stripApostrophe = lowercaseify.replace("'", "");
    var output = stripApostrophe.replace(/\s+/g, "-");

    return output;
}

/**
  * very poor method of checking file type. 
  */
function filetype (file) {
    var jpg = file.endsWith('.jpg');
    var gif = file.endsWith('.gif');
    
    if (jpg) {
        return ".jpg";
    } else {
        return ".gif";
    };
}

/**
  * Reads array of quotes and picks one at random
  */
function randomQuote(list) {
    return list[Math.round(Math.random()*(list.length-1))];
}