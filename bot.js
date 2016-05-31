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
        var help = input.startsWith('!help');

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
            "**__Display Help Menu__**" +'\n'+
            "`!help` - Displays this help menu" +'\n'+'\n');
        }return
    });

}

function paean() {    

    bot.on("message", function(message) {
        var re = /(paean)/i;
        var input = message.content;
        var help = input.startsWith('!help');
        
        if (help) {
            return
        } 
        if (input.search(re) != -1){
            bot.reply(message, "That does not return any results. But, I have noticed a pattern. Because I am a genius HE HE HE");
            bot.sendFile( message.channel, "https://cdn.discordapp.com/attachments/143886914326495233/186270379533139979/IMG_0800.GIF", "IMG_0800.GIF");
        }return

    });
}

bot.loginWithToken(process.env.CLIENT_ID, function (token, err) {
    if(err){
        console.log(err);
    }

    searchGrimoire();    
    searchCard();
    searchItems();
    help();
    paean();
    
});