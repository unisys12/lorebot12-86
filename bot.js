require('./server.js');
var dischord = require('discord.js');

var bot = new dischord.Client();

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
        var lowercaseify = stripeCmd.toLowerCase();
        var cardSearch = input.startsWith('!card');
        var trailingUri = stripeCmd.replace(/\s+/g, "-");

        if(cardSearch) {
            bot.reply(message, "http://www.ishtar-collective.net/cards/" + trailingUri);
        } return
    });
}

function searchItems() {
    bot.on("message", function(message) {
        var input = message.content;
        var stripeCmd = input.substr('6');
        var lowercaseify = stripeCmd.toLowerCase();
        var cardSearch = input.startsWith('!item');
        var stripApostrophe = lowercaseify.replace("'", "");
        var trailingUri = stripApostrophe.replace(/\s+/g, "-");

        if(cardSearch) {
            bot.reply(message, "http://www.ishtar-collective.net/items/" + trailingUri);
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
            "**LoreBot Help Menu**" +'\n'+
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
            "**__Display Help Menu__**" +'\n'+
            "`!help` - Displays this help menu" +'\n'+'\n');
        }return
    });

}

function reconnect() {
    bot.on("disconnected", () => {
        console.log("Disconnected, holy crap!");
        console.log("Gonna try to reconnect now... ");
        bot.sendMessage('184268959003049989', "Bot has gone offline and trying to reconnect!")
    })
}

bot.loginWithToken(process.env.CLIENT_ID, function (token, err) {
    if(err){
        console.log(err);
    }

    searchGrimoire();    
    searchCard();
    searchItems();
    help();
    reconnect();
    
});