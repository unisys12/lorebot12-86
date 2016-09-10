var mysql = require('mysql2');
var scripts = require('../scripts/scripts');

// Configure MySQL2 Connection
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

/**
 * Returns all instances of a single tag
 *
 * @param {string} tag - Tag user is searching for
 * @returns {resource}
 */
var findByTag = function (tag, callback) {
    connection.query(
        "SELECT * FROM `npcs` WHERE `tags` LIKE '%" + tag + "%'", function (err, rows){
            
            // Handle any errors. Display errors and exit program
            if (err) {
                callback(err)
                return;
            }

            // Check number of rows returned. If none, then output message showing their input.
            if (rows.length < 1) {
                callback("No results found when searching for '" + tag + "'")
            }

            callback(rows);
    });
}

/**
 * Returns all instances of a single name
 *
 * @param {string} name - Tag user is searching for
 * @returns {resource}
 */
var findByNPC = function (name, callback) {
    var npcColumns = ['name', 'quote'];
    var npcQuery = connection.query("SELECT ?? FROM ?? WHERE ?? = ?", 
        [npcColumns, 'npcs', 'name', name], function (err, rows) {

        // Handle any errors. Display errors and exit program
        if (err) {
            callback("Error Connecting: " + err + ". Do me a favor and let 'unisys12' know.");
        }
        
        // Check number of rows returned. If none, then output message showing their input.
        if (rows.length < 1) {            
            callback("No results found when searching for '" + name + "'");
        }

        // Send the results to be processed
        callback(rows);
    });
}

/**
 * Returns all instances of a name and tag combination
 *
 * @param {string} name - NPC user is searching for
 * @param {string} tag - tag user is searching with NPC
 * @returns {callback}
 */
var findTagByNPC = function (name, tag, callback) {
    var query = connection.query("SELECT `quote` FROM `npcs` WHERE `name` = " + "'" + name + "'" + " AND `tags` LIKE '%" + tag + "%'",
    
     function (err, rows) {
        
        // Handle any errors. Display errors and exit program
        if (err) {
            console.log("Error occured in findTagByNPC: " + err);
            callback(["Error Connecting: " + err + ". Do me a favor and let 'unisys12' know."]);
        }

        console.log("Number of rows returned are: " + rows.length);

        // Check number of rows returned. If none, then output message showing their input.
        if(rows.length < 1) {
            callback(["No results found when searching quotes for NPC: " + name + " with tags: " +tag]);
        }

        // simply return the callback...
        callback(rows);
    });
}


module.exports.findByTag = findByTag;
module.exports.findByNPC = findByNPC;
module.exports.findTagByNPC = findTagByNPC;