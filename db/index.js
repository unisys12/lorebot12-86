var mysql = require('mysql2');
var scripts = require('../scripts/scripts');

// Configure MySQL2 Connection
var pool = mysql.createPool({
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
    pool.query(
        "SELECT * FROM `npcs` WHERE `tags` LIKE '%" + tag + "%'", function (err, rows){
            
            // Handle any errors. Display errors and exit program
            if (err) {
                callback(err)
                return;
            }

            // Check number of rows returned. If none, then output message showing their input.
            if (typeof rows === 'undefined') {
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
    var npcQuery = pool.query("SELECT ?? FROM ?? WHERE ?? = ?", 
        [npcColumns, 'npcs', 'name', name], function (err, rows) {

        // Handle any errors. Display errors and exit program
        if (err) {
            callback("Error Connecting: " + err + ". Do me a favor and let '@Unisys12#5080' know.");
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
    var query = pool.query("SELECT `quote` FROM `npcs` WHERE `name` = " + "'" + name + "'" + " AND `tags` LIKE '%" + tag + "%'",
    
     function (err, rows) {
        
        // Handle any errors. Display errors and exit program
        if (err) {
            console.log("Error occured in findTagByNPC: " + err);
            callback("Error Connecting: " + err + ". Do me a favor and let '@unisys12' know.");
        }

        // simply return the callback...
        callback(rows);
    });
}

module.exports.findByTag = findByTag;
module.exports.findByNPC = findByNPC;
module.exports.findTagByNPC = findTagByNPC;