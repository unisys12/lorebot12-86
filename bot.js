require('./server.js');
var scripts = require('./scripts/scripts.js');
var dischord = require('discord.js');

// Set-up the MongoDB Client
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = process.env.MONGODB_URI;

var bot = new dischord.Client({revive: true});

function searchGrimoire(input, message) {

    var stripeCmd = input.substr('8');

    bot.reply(message, "http://www.ishtar-collective.net/search/" + encodeURIComponent(stripeCmd));

}

function searchCard(input, message) {

        var stripeCmd = input.substr('6');
        var query = scripts.normalizeCardInput(stripeCmd);

        bot.reply(message, "http://www.ishtar-collective.net/cards/" + query);

}

function searchItems(input, message) {

        var stripeCmd = input.substr('6');        
        var query = scripts.normalizeItemInput(stripeCmd);

        bot.reply(message, "http://www.ishtar-collective.net/items/" + query);

}

function help(input, message) {

    bot.sendMessage(message.author,
        "**LoreBot Help Menu**" +'\n'+'\n'+
        "**__Search Ishtar by Topic__**" +'\n'+
        "**!search** *your search topic*" +'\n'+
        "ex: `!search osiris`" +'\n'+
        "This will return a link such as - ishtar-collective.net/search/osiris" +'\n'+'\n'+
        "**__Search Ishtar for Grimoire Card__**" +'\n'+
        "**!card** *exact name of card you want to show in chat*"+'\n'+
        "ex: `!card osiris`" +'\n'+
        "This will return a link to the card, with first 50 or so characters and image of card. If not, then no card name matched your query. The link provided will still take you to Ishtar and give suggestions based on your query." +'\n'+'\n'+
        "**__Search Ishtar for Item__**" +'\n'+
        "**!item** *item you want to show in chat*" +'\n'+
        "ex: `!item ace of spades`" +'\n'+
        "This will, like the card command, return a link to the item or weapon along with the flavor text and an image of the item. If not, then your search did not match. Follow the link to Ishtar and check if it's suggestions match what you were looking for." +'\n'+'\n'+
        "**__NPC Quotes__**" +'\n'+
        "**!quotes** *the person your wanting the quotes from*" +'\n'+
        "ex: `!quotes mara`" +'\n'+
        "This will return a single random quote from Mara Sov. You can type in Mara, mara, mara sov or queen of the reef, etc to get these quotes." +'\n'+'\n'+
        "**__Display Help Menu__**" +'\n'+
        "`!lorehelp` - Displays this help menu" +'\n'+'\n');

}

/*function paean() {    

    bot.on("message", function(message) {
        var input = message.content;
        var help = /(!help)/;
        var paean = /(paean)/i;
        var poster = message.author.id;
        var checkPoster = '159985870458322944';
        var checkForPaean = input.search(paean) != -1;
        var checkForHelp = input.search(help) != -1;
        var memes = [
            "http://sos.campmobile.net/e/2h28ej_g/he7Ud015a309a37y82it_awsowi.jpg",
            "http://sos.campmobile.net/e/2h28ef_6/bbjUd015pzbbt8dfcbse_hsmjp8.jpg",
            "http://sos.campmobile.net/d/2h204b_e/469Ud0151fl3ky5g3fy6u_o6iq9q.jpg",
            "http://sos.campmobile.net/d/2h28cd_d/2d5Ud015psn7vdj6a3wt_l0ky7l.jpg",
            "http://sos.campmobile.net/d/2h068g_i/3e8Ud0158cjt8r6d5mxb_l0ky7l.jpg",
            "https://cdn.discordapp.com/attachments/143886914326495233/186270379533139979/IMG_0800.GIF"
            ]
        var pick = memes[Math.round(Math.random()*(memes.length-1))];
        var name = pick.substr(40, 5);     

        breakMyth: if ( checkPoster === poster ) {
            break breakMyth;
        } else if ( checkForPaean ) {
            bot.reply(message, "That does not return any results. But, I have noticed a pattern. Because I am a genius HE HE HE");
            bot.sendFile( message.channel, pick, name + filetype(pick));
        }       
    });
}*/

function quotes (input, message) {
        
    var query = scripts.normalizeItemInput(input.substr('8')).replace(/\s+/g, "-");

    switch (query) {
        case "speaker":
        case "the-speaker":
            var qSpeaker = require('./assets/speaker.js');
            bot.sendMessage(message.channel, "**The Speaker: **" + scripts.randomQuote(qSpeaker));
            break;
        case "cayde":
        case "cayde-6":
            var qCayde = require('./assets/cayde.js');
            bot.sendMessage(message.channel, "**Cayde-6: **" + scripts.randomQuote(qCayde));
            break;
        case "ikora":
        case "ikora-rey":
            var qIkora = require('./assets/ikora.js');
            bot.sendMessage(message.channel, "**Ikora Rey: **" + scripts.randomQuote(qIkora));
            break;
        case "zavala":
        case "commander-zavala":
            var qZavala = require('./assets/zavala.js');
            bot.sendMessage(message.channel, "**Commander Zavala: **" + scripts.randomQuote(qZavala));
            break;
        case "xur":
        case "agent-of-the-nine":
        case "agent-of-the-9":
            var qXur = require('./assets/xur.js');
            bot.sendMessage(message.channel, "**Xur: **" + scripts.randomQuote(qXur));
            break;
        case "eris":
        case "eris-morn":
            var qEris = require('./assets/eris.js');
            bot.sendMessage(message.channel, "**Eris Morn: **" + scripts.randomQuote(qEris));
            break;
        case "ives":
        case "master ives":
        case "reef-cryptarch":
        case "the-reef-cryptarch":
        case "reefs-cryptarch":
        case "the-reefs-cryptarch":
            var qIves = require('./assets/ives.js');
            bot.sendMessage(message.channel, "**Master Ives: **" + scripts.randomQuote(qIves));
            break;
        case "mara":
        case "mara-sov":
        case "the-queen":
        case "queen-of-the-reef":
        case "the-queen-of-the-reef":
            var qMara = require('./assets/mara.js');
            bot.sendMessage(message.channel, "**Mara Sov: **" + scripts.randomQuote(qMara));
            break;
        case "osiris":
            var qOsiris = require('./assets/osiris.js');
            bot.sendMessage(message.channel, "**Osiris: **" + scripts.randomQuote(qOsiris));
            break;
        case "petra":
        case "petra-venj":
            var qPetra = require('./assets/petra.js');
            bot.sendMessage(message.channel, "**Petra Venj: **" + scripts.randomQuote(qPetra));
            break;
        case "rahool":
        case "master-rahool":
        case "the-cryptarch":
        case "the-tower-cryptarch":
        case "the-towers-cryptarch":
            var qRahool = require('./assets/rahool.js');
            bot.sendMessage(message.channel, "**Master Rahool: **" + scripts.randomQuote(qRahool));
            break;
        case "shaxx":
        case "lord-shaxx":
            var qShaxx = require("./assets/shaxx.js");
            bot.sendMessage(message.channel, "**Lord Shaxx: **" + scripts.randomQuote(qShaxx));
            break;
        case "saladin":
        case "lord-saladin":
        case "saladin-forge":
        case "forge":
            var qSaladin = require("./assets/saladin.js");
            bot.sendMessage(message.channel, "**Lord Saladin Forge: **" + scripts.randomQuote(qSaladin));
            break;
        case "arcite":
        case "arcite-99-40":
        case "crucible quartermaster":
            var qArcite = require('./assets/arcite.js');
            bot.sendMessage(message.channel, "**Arcite 99-40: **" + scripts.randomQuote(qArcite));
            break;
        case "kadi":
        case "kadi 55-30":
        case "postmaster":
        case "tower postmaster":
        case "vanguard postmaster":
            var qKadi = require('./assets/kadi.js');
            bot.sendMessage(message.channel, "**Kadi 55-30: **" + scripts.randomQuote(qKadi));
        case "list":
        case "show list":
            bot.sendMessage(message.author, 
                "**__List of NPC's Currently in My System Followed by How to Call Them__**" +'\n'+
                "_ex:_ `!quotes ives`" +'\n'+'\n'+
                "**The Speaker** - _speaker_ , _the speaker_" +'\n'+
                "**Cayde-6** - _cayde_ , _cayde 6_ , _cayde-6_" +'\n'+
                "**Ikora Rey** - _ikora_ , _ikora rey_ " +'\n'+
                "**Commander Zavala** - _zavala_ , _commander zavala_" +'\n'+
                "**Xur** - _xur_ , _agent of the nine_ , _agent of the 9_ " +'\n'+
                "**Eris Morn** - _eris_ , _eris morn_ " +'\n'+
                "**Master Ives** - _ives_ , _master ives_ , _reef cryptarch_ , _the reef cryptarch_ , _reefs cryptarch_ , _the reefs cryptarch_ " +'\n'+
                "**Mara Sov** - _mara_ , _mara sov_ , _the queen_ , _the queen of the reef_ , _queen of the reef_ " +'\n'+
                "**Osiris** - _osiris_ " +'\n'+
                "**Petra Venj** - _petra venj_ , _petra_ " +'\n'+
                "**Master Rahool** - _master rahool_ , _rahool_ , _the cryptarch_ , _the tower cryptarch_ , _the towers cryptarch_ " +'\n'+
                "**Lore Shaxx** - _lord shaxx_ , _shaxx_ " +'\n'+
                "**Lord Saladin Forge** - _lord saladin_ , _saladin_ , _saladin forge_ , _forge_" +'\n'+
                "**Arcite 99-40** - _arcite_ , _arcite 99-40_ , _crucible quartermaster_" +'\n'+
                "**Kadi 55-30** - _kadi_ , _postmaster_ , _tower postmaster_ , _vanguard postmaster_ " +'\n');
            break;
        default:
            bot.reply(message, "Sorry, either that NPC does not exist or I have not gathered their qoutes just yet. For a listing of supported NPC's issue the following command `!quotes list`.")
    }
}

bot.loginWithToken(process.env.CLIENT_ID, function (token, err) {
    if(err){
        console.log(err);
    }

    //paean();
    bot.on("message", function (message) {
        var input = message.content;

        var quoteCmd = input.startsWith('!quotes');
        var helpCmd = input.startsWith('!lorehelp');
        var itemCmd = input.startsWith('!item');
        var cardCmd = input.startsWith('!card');
        var siteCmd = input.startsWith('!search'); 
        
        if (quoteCmd) { quotes(input,message) };
        if (helpCmd) { help(input, message) };
        if (itemCmd) { searchItems(input, message) };
        if (cardCmd) { searchCard(input, message) };
        if (siteCmd) { searchGrimoire(input, message) };
    }) 
    
});