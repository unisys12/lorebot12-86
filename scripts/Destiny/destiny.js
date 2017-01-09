'use strict'

const npcQuotes = require('../quotes')
const scripts = require('../scripts')

function searchGrimoire(input) {

    let stripeCmd = input.substr('8')

    return "http://www.ishtar-collective.net/search/" + encodeURIComponent(stripeCmd)

}

function searchCard(input) {

        let stripeCmd = input.substr('6');
        let query = scripts.normalizeCardInput(stripeCmd);

        return "http://www.ishtar-collective.net/cards/" + query
}

function searchItems(input) {

        let stripeCmd = input.substr('6');
        let query = scripts.normalizeItemInput(stripeCmd);

        return "http://www.ishtar-collective.net/items/" + query

}

function help() {

return "**LoreBot Help Menu**" +'\n'+'\n'+
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
"`!lorehelp` - Displays this help menu" +'\n'+'\n'

}

function quotes (input, cb) {

    // Initialize Possible Empty Vars
    let npc,
        tag;

    // Captures all of users input
    let query = input.substr('8').toLowerCase();
    console.log('query: ' + query)

    // Find if Tag is present, represents the "-" in "-tag"
    let tagIndex = query.indexOf("-tag");
    console.log('tagIndex: ' + tagIndex)

    // Intialize NPC to act as though no tag is entered
    npc = query.substr(0);
    console.log('npc: ' + npc)

    if (tagIndex > 0) {
        // Tag is present, represents tag
        tag = query.substr(tagIndex + 5);
        npc = query.substring(0, (tagIndex-1));
        console.log('tag: ' + tag)
        console.log('Newnpc: ' + npc)
    }

    // Initalize an empty let that holds the active NPC name
    let NPC;
    let quote = {}

    switch (npc) {
        case "all":
        case "a":
            NPC = "";
            return npcQuotes.processTagQuotes(tag, cb);
        case "speaker":
        case "the speaker":
            NPC = "The Speaker";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "cayde":
        case "cayde 6":
            NPC = 'Cayde-6';
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "ikora":
        case "ikora rey":
            NPC = "Ikora Rey";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "zavala":
        case "commander zavala":
            NPC = "Commander Zavala";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "xur":
        case "agent of the-nine":
        case "agent of the-9":
            NPC = "Xur";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "eris":
        case "eris morn":
            NPC = "Eris Morn";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "ives":
        case "master ives":
        case "reef cryptarch":
        case "the reef cryptarch":
        case "reefs cryptarch":
        case "the reefs cryptarch":
            NPC = "Master Ives";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "mara":
        case "mara sov":
        case "the queen":
        case "queen of the reef":
        case "the queen of the reef":
            NPC = "Mara Sov";
            npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "osiris":
            NPC = "Osiris";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "petra":
        case "petra venj":
            NPC = "Petra Venj";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "rahool":
        case "master rahool":
        case "the cryptarch":
        case "the tower cryptarch":
        case "the towers cryptarch":
            NPC = "Master Rahool";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "shaxx":
        case "lord shaxx":
            NPC = "Lord Shaxx";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "saladin":
        case "lord saladin":
        case "saladin forge":
        case "forge":
            NPC = "Lord Saladin";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "arcite":
        case "arcite 99-40":
        case "crucible quartermaster":
            NPC = "Arcite 99-40";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "kadi":
        case "kadi 55-30":
        case "postmaster":
        case "tower postmaster":
        case "vanguard postmaster":
            NPC = "Kadi 55-30";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "amanda":
        case "amanda holliday":
        case "shipwright":
            NPC = "Amanda Holliday";
            return npcQuotes.processNpcQuotes(NPC, tag, cb);
        case "banshee":
        case "banshee 44":
        case "banshee-44":
            NPC = "Banshee-44";
            return npcQuotes.processNpcQuotes(NPC, tag, cb );
        case "list":
        case "show list":
            return cb(null,
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
                "If you have any questions, comments or requests, follow me on twitter @unisys12."
            );
        default:
            return cb(null, "Sorry, either that NPC does not exist or I have not gathered their qoutes just yet. For a listing of supported NPC's issue the following command `!quotes list`.");
    }
}

module.exports.searchGrimoire = searchGrimoire
module.exports.searchCard = searchCard
module.exports.searchItems = searchItems
module.exports.help = help
module.exports.quotes = quotes
