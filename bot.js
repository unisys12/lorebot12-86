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
        }

    });
}

function searchCard() {
    bot.on("message", function(message) {
        var input = message.content;
        var stripeCmd = input.substr('7');
        var cardSearch = input.startsWith('!card');
        var trailingUri = stripeCmd.replace(/\s+/g, "-");

        if(cardSearch) {
            bot.reply(message, "http://www.ishtar-collective.net/cards/" + trailingUri);
        }
    });
}

bot.loginWithToken(process.env.CLIENT_ID, function (token, err) {
    if(err){
        console.log(err);
    }

    searchGrimoire();
    //searchCard();
});