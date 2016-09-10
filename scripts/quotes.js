'use strict'

var db = require('../db/index.js');
var app = require.main.exports;

/**
 * Process query results for NPC quoutes from the database
 *
 * @var npc {string} - name of NPC
 * @var tag {string} - tag passed to command
 * @var message {object} - message object that sent the command
 *
 * @returns {object} - returns a message object to the chat
 */
 
var processNpcQuotes = function (npc, tag, message) {
    // Empty Message Body
    var results = [];

    // If no tags are passed, run findByNPC
    console.log(tag);
    if (!tag) {
        // Return random quote for NPC from database

        // Set Message Header
        results.push("__**Random Quote for " + npc + "**__");

        // Run Query to find NPC and return results
        db.findByNPC(npc, function (cb) {

            // Pick a random number between 0 and the length of the results
            var num = Math.floor(Math.random() * (cb.length - 0 + 1));

            console.log("Out of " + cb.length + " results, I choose " + num);

            // Iterate over the results to retrieve the index from above.
            for (var i = 0; i < cb.length; i++) {
                var quote = cb[num].quote;
            }

            console.log("Quote chosen is : " + quote);

            results.push(quote);

        app.bot.sendMessage(message, results);

        results = [];

        });                
    }else{
        /**
          * Return set of quotes for npc based on tag
          */

        // Set Message Header
        results.push("__**" + npc + " Quotes on the topic of `" + tag + "` : **__");
        
        db.findTagByNPC(npc, tag, function (cb) {
            
            // Check if response is a message
            if (cb.indexOf('No Results') || cb.indexOf('Error') !== -1) {
                // Send the feedback to the enduser
                results.push(cb);
                return;
            }
            
            // Process results into separate reponses
            for (var i = 0; i < cb.length; i++) {
                // Add responses to message body
                results.push("- " + cb[i].quote);
            }

            // Send the message to chat
            app.bot.sendMessage(message, results);

            // reset results to empty array
            results = [];
            
        });
    }
}

module.exports.processNpcQuotes = processNpcQuotes;
