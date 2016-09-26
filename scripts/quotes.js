'use strict'

var db = require('../db/index.js');
var app = require.main.exports;
var _ = require('underscore');

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
    if (!tag) {
        // Return random quote for NPC from database

        // Set Message Header
        results.push("__**Random Quote for " + npc + "**__");

        // Run Query to find NPC and return results
        db.findByNPC(npc, function (cb) {

            // Return message if NPC is not in the database
            if (cb.length < 1) {
                results.push(npc + " is currently not in the database! Let "+app.bot.user+" know.");
            }else{

                // Pick a random number between 0 and the length of the results
                var num = Math.floor(Math.random() * (cb.length - 1));

                // Iterate over the results to retrieve the index from above.
                for (var i = 0; i < cb.length; i++) {
                    var quote = cb[num].quote;
                }

                // Add response to message body
                results.push(quote);
            }            

            // Send the message to chat
            app.bot.sendMessage(message, results);

            // reset results to empty array
            results = [];

        });                
    }else{
        /**
          * Return set of quotes for npc based on tag
          */

        // Set Message Header
        results.push("__**" + npc + " Quotes on the topic of `" + tag + "` : **__");
        
        db.findTagByNPC(npc, tag, function (cb) {
            
            // Check for results
            if (cb.length < 1) {
                results.push("Sorry, but the tag _" + tag + "_ has not been assigned to any of _" + npc + "'s_ quotes.");
            }else{
                // Process results into separate reponses
                for (var i = 0; i < cb.length; i++) {
                    // Add responses to message body
                    results.push("- " + cb[i].quote);
                    //console.log(cb[i].quote);
                }
                
            }

            // Send the message to chat
            app.bot.sendMessage(message, results);

            // reset results to empty array
            results = [];
            
        });
    }
}

/**
 * Return a message containing quotes related to a tag
 */

var processTagQuotes = function(tag, message) {
    var results = [];

    results.push("**__All quotes related to _" + tag + "_ __**" +'\n');

    db.findByTag(tag, function(cb) {
        
        if (cb.length < 1) {
            results.push("Sorry, but the tag _" + tag + "_ has not been assigned to any npc quotes.");
        }else{
            
            // Generate a list of names.
            var names = _.pluck(cb, 'name');
            // ignore the first line since it is undefinded
            var ignore = names.shift();
            // Generate a list of unique names
            var uniq = _.uniq(names);

            results = [];

            //iterate through that list, search for quotes within the object
            for(var i=0; i<uniq.length; i++){
              // Push out header containing NPC name of iteration
              results.push("__**Quotes by " + uniq[i] + " related to " + tag + "**__");
                
                for(var n=0; n<cb.length; n++) {
                    if(cb[n].name === uniq[i]){
                    results.push("- " + cb[n].quote);
                    }
                }

            }
        }

        //console.log(results);

        // Send the message to chat
        app.bot.sendMessage(message, results);

        // reset results to empty array
        results = [];

    });
}

module.exports.processNpcQuotes = processNpcQuotes;
module.exports.processTagQuotes = processTagQuotes;
