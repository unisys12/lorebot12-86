if (!process.env.TOKEN) {
    require('dotenv').config();
}
var scripts = require('./scripts/scripts.js');
var npcQuotes = require('./scripts/quotes.js');
var dischord = require('discord.js');
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

    // Initialize Possible Empty Vars
    var npc, 
        tag;

    // Captures all of users input
    var query = input.substr('8').toLowerCase();

    // Find if Tag is present, represents the "-" in "-tag"
    var tagIndex = query.indexOf("-tag");

    // Intialize NPC to act as though no tag is entered
    npc = query.substr(0);

    if (tagIndex > 0) {
        // Tag is present, represents tag
        tag = query.substr(tagIndex + 5);
        npc = query.substring(0, (tagIndex-1));
    }    

    // Initalize an empty var that holds the active NPC name
    var NPC;

    switch (npc) {
        case "all":
        case "a":
            NPC = "";
            npcQuotes.processTagQuotes(tag, message);
            break;
        case "speaker":
        case "the speaker":
            NPC = "The Speaker";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "cayde":
        case "cayde 6":
            NPC = 'Cayde-6';
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "ikora":
        case "ikora rey":
            NPC = "Ikora Rey";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "zavala":
        case "commander zavala":
            NPC = "Commander Zavala";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "xur":
        case "agent of the-nine":
        case "agent of the-9":
            NPC = "Xur";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "eris":
        case "eris morn":
            NPC = "Eris Morn";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "ives":
        case "master ives":
        case "reef cryptarch":
        case "the reef cryptarch":
        case "reefs cryptarch":
        case "the reefs cryptarch":
            NPC = "Master Ives";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "mara":
        case "mara sov":
        case "the queen":
        case "queen of the reef":
        case "the queen of the reef":
            NPC = "Mara Sov";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "osiris":
            NPC = "Osiris";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "petra":
        case "petra venj":
            NPC = "Petra Venj";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "rahool":
        case "master rahool":
        case "the cryptarch":
        case "the tower cryptarch":
        case "the towers cryptarch":
            NPC = "Master Rahool";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "shaxx":
        case "lord shaxx":
            NPC = "Lord Shaxx";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "saladin":
        case "lord saladin":
        case "saladin forge":
        case "forge":
            NPC = "Lord Saladin";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "arcite":
        case "arcite 99-40":
        case "crucible quartermaster":
            NPC = "Arcite 99-40";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "kadi":
        case "kadi 55-30":
        case "postmaster":
        case "tower postmaster":
        case "vanguard postmaster":
            NPC = "Kadi 55-30";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "amanda":
        case "amanda holliday":
        case "shipwright":
            NPC = "Amanda Holliday";
            npcQuotes.processNpcQuotes(NPC, tag, message);
            break;
        case "list":
        case "show list":
            bot.sendMessage(message.author, 
                "**__List of NPC's Currently in My System Followed by How to Call Them__**" +'\n'+'\n'+
                
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
                "**Kadi 55-30** - _kadi_ , _postmaster_ , _tower postmaster_ , _vanguard postmaster_ " +'\n'+
                "**Amanda Holliday** - _amanda_ , _amanda holliday_ , _shipwright_ " +'\n'+
                ""+'\n'+
                "If you would like to view a random quote from an NPC "+'\n'+
                "_ex:_ `!quotes ives`" +'\n'+'\n'+
                "To see a list of quotes for an NPC related to a tag or subject"+'\n'+
                "_ex:_ `!quotes petra -tag queen` will return a list of quotes related to The Queen of the Reef."+'\n'+'\n'+
                "A special thanks to Focused Fire Community members @bluecrew86, @ryno-666 and @taylor-b- for helping me gather the quotes currently in LoreBot. More are on the way."+'\n'+
                "If you have any questions, comments or requests, follow me on twitter @unisys12.");
            break;
        default:
            bot.reply(message, "Sorry, either that NPC does not exist or I have not gathered their qoutes just yet. For a listing of supported NPC's issue the following command `!quotes list`.")
    }
}

bot.internal.sendWS = function sendWS(object) {
    if (this.websocket) {
        if (object.d.token) object.d.token = process.env.TOKEN;
        this.websocket.send(JSON.stringify(object));
    }
};

bot.loginWithToken("Bot "+process.env.TOKEN, function (token, err) {
    if(err){
        console.log(err);
    }

    bot.once("ready", function() {
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
        });
    });
    
});

module.exports.bot = bot;