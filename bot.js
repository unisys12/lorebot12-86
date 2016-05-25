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
    reconnect();
    
});