require('./server.js');
var dischord = require('discord.js');

var bot = new dischord.Client({revive: true});

function normalizeCardInput(msg) {
    var lowercaseify = msg.toLowerCase();
    var removeColon = lowercaseify.replace(":", "");
    var output = removeColon.replace(/\s+/g, "-");

    return output;    
}

function normalizeItemInput(msg) {
    var lowercaseify = msg.toLowerCase();
    var stripApostrophe = lowercaseify.replace("'", "");
    var output = stripApostrophe.replace(/\s+/g, "-");

    return output;
}

function filetype (file) {
    var jpg = file.endsWith('.jpg');
    var gif = file.endsWith('.gif');
    
    if (jpg) {
        return ".jpg";
    } else {
        return ".gif";
    };
}

function randomQuote(list) {
    return list[Math.round(Math.random()*(list.length-1))];
}

function searchGrimoire() {
    bot.on("message", function(message) {
        var input = message.content;
        var stripeCmd = input.substr('8');
        var siteSearch = input.startsWith('!search');

        if(siteSearch) {
            bot.reply(message, "http://www.ishtar-collective.net/search/" + encodeURIComponent(stripeCmd));
        } return
    });
}

function searchCard() {
    bot.on("message", function(message) {
        var input = message.content;
        var stripeCmd = input.substr('6');
        var cardSearch = input.startsWith('!card');        
        
        var query = normalizeCardInput(stripeCmd);

        if(cardSearch) {
            bot.reply(message, "http://www.ishtar-collective.net/cards/" + query);
        } return
    });
}

function searchItems() {
    bot.on("message", function(message) {
        var input = message.content;
        var stripeCmd = input.substr('6');
        var cardSearch = input.startsWith('!item');
        
        var query = normalizeItemInput(stripeCmd);

        if(cardSearch) {
            bot.reply(message, "http://www.ishtar-collective.net/items/" + query);
        } return
    });
}

function help() {
    bot.on("message", function(message) {
        var input = message.content;
        var stripeCmd = input.substr('6');
        var lowercaseify = stripeCmd.toLowerCase();
        var help = input.startsWith('!lorehelp');

        if(help) {
            bot.sendMessage(message,
            "**LoreBot Help Menu**" +'\n'+'\n'+
            "**__Search Ishtar by Topic__**" +'\n'+
            "**!search** *your search topic*" +'\n'+
            "ex: `!search osiris`" +'\n'+
            "This will return a link such as - ishtar-collective.net/search/osiris" +'\n'+'\n'+
            "**__Pull Card From Ishtar__**" +'\n'+
            "**!search** *exact name of card you want to show in chat*"+'\n'+
            "ex: `!card osiris`" +'\n'+
            "This will return a link to the card, with first 50 or so characters and image of card. If not, then no card name matched your query. The link provided will still take you to Ishtar and give suggestions based on your query." +'\n'+'\n'+
            "**__Pull Item From Ishtar__**" +'\n'+
            "**!item** *item you want to show in chat*" +'\n'+
            "ex: `!item ace of spades`" +'\n'+
            "This will, like the card method, return a link to the item or weapon along with the flavor text and an image of the item. If not, then your search did not match. Follow the link to Ishtar and check if it's suggestions match what you were looking for." +'\n'+'\n'+
            "**__Magic Word__**" +'\n'+
            "Don't do it! Really? I dare ya!" +'\n'+'\n'+
            "**__NPC Quotes__**" +'\n'+
            "**!quotes** *the person your wanting the quotes from*" +'\n'+
            "ex: `!quotes mara`" +'\n'+
            "This will return a single random quote from Mara Sov. You can type in Mara, mara, mara sov or queen of the reef, etc to get these quotes." +'\n'+'\n'+
            "**__Display Help Menu__**" +'\n'+
            "`!lorehelp` - Displays this help menu" +'\n'+'\n');
        }return
    });

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
        
    var query = normalizeItemInput(input.substr('8')).replace(/\s+/g, "-");

    switch (query) {
        case "speaker":
        case "the-speaker":
            var qSpeaker = require('./assets/speaker.js');
            bot.sendMessage(message.channel, "**The Speaker: **" + randomQuote(qSpeaker));
            break;
        case "cayde":
        case "cayde-6":
            var qCayde = require('./assets/cayde.js');
            bot.sendMessage(message.channel, "**Cayde-6: **" + randomQuote(qCayde));
            break;
        case "ikora":
        case "ikora-rey":
            var qIkora = require('./assets/ikora.js');
            bot.sendMessage(message.channel, "**Ikora Rey: **" + randomQuote(qIkora));
            break;
        case "zavala":
        case "commander-zavala":
            var qZavala = require('./assets/zavala.js');
            bot.sendMessage(message.channel, "**Zavala Rey: **" + randomQuote(qZavala));
            break;
        case "xur":
        case "agent-of-the-nine":
        case "agent-of-the-9":
            var qXur = require('./assets/xur.js');
            bot.sendMessage(message.channel, "**Xur: **" + randomQuote(qXur));
            break;
        case "eris":
        case "eris-morn":
            var qEris = require('./assets/eris.js');
            bot.sendMessage(message.channel, "**Eris Morn: **" + randomQuote(qEris));
            break;
        case "ives":
        case "master ives":
        case "reef-cryptarch":
        case "the-reef-cryptarch":
        case "reefs-cryptarch":
        case "the-reefs-cryptarch":
            var qIves = require('./assets/ives.js');
            bot.sendMessage(message.channel, "**Master Ives: **" + randomQuote(qIves));
            break;
        case "mara":
        case "mara-sov":
        case "the-queen":
        case "queen-of-the-reef":
        case "the-queen-of-the-reef":
            var qMara = require('./assets/mara.js');
            bot.sendMessage(message.channel, "**Mara Sov: **" + randomQuote(qMara));
            break;
        case "osiris":
            var qOsiris = require('./assets/osiris.js');
            bot.sendMessage(message.channel, "**Osiris: **" + randomQuote(qOsiris));
            break;
        case "petra":
        case "petra-venj":
            var qPetra = require('./assets/petra.js');
            bot.sendMessage(message.channel, "**Petra Venj: **" + randomQuote(qPetra));
            break;
        case "rahool":
        case "master-rahool":
        case "the-cryptarch":
        case "the-tower-cryptarch":
        case "the-towers-cryptarch":
            var qRahool = require('./assets/rahool.js');
            bot.sendMessage(message.channel, "**Master Rahool: **" + randomQuote(qRahool));
            break;
        default:
            bot.reply(message, "Sorry, either that NPC does not exist or I have not gathered their qoutes just yet. Check your spelling or check back soon.")
    }
}

bot.loginWithToken(process.env.CLIENT_ID, function (token, err) {
    if(err){
        console.log(err);
    }

    searchGrimoire();    
    searchCard();
    searchItems();
    help();
    //paean();
    bot.on("message", function (message) {
        var input = message.content;
        var quoteCmd = input.startsWith('!quotes');
        
        if (quoteCmd) {
            quotes(input,message);
        }
    }) 
    
});