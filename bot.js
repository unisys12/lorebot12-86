require('./server.js');
var dischord = require('discord.js');

var bot = new dischord.Client();

function standarizeInput(input) {
    var input = message.content;
    var lowercaseify = input.toLowerCase();
    var output = lowercaseify.replace("'", "");

    return output;
}

function slugifyInput(input) {
    var input = message.content;
    var lowercaseify = input.toLowerCase();
    var stripApostrophe = lowercaseify.replace("'", "");
    var output = stripApostrophe.replace(/\s+/g, "-");

    return output;
}

function searchGrimoire() {
    bot.on("message", function(message) {
        var input = standarizeInput(message.content);
        var stripeCmd = input.substr('8');
        var siteSearch = input.startsWith('!search');

        if(siteSearch) {
            bot.reply(message, "http://www.ishtar-collective.net/search/" + encodeURIComponent(stripeCmd));
        } return
    });
}

function searchCard() {
    bot.on("message", function(message) {
        var input = slugifyInput(message.content);
        var stripeCmd = input.substr('6');
        var cardSearch = input.startsWith('!card');

        if(cardSearch) {
            bot.reply(message, "http://www.ishtar-collective.net/cards/" + trailingUri);
        } return
    });
}

function searchItems() {
    bot.on("message", function(message) {
        var input = slugifyInput(message.content);
        var stripeCmd = input.substr('6');
        var cardSearch = input.startsWith('!item');
        
        if(cardSearch) {
            bot.reply(message, "http://www.ishtar-collective.net/items/" + trailingUri);
        } return
    });
}

function reconnect() {
    bot.on("disconnected", () => {
        console.log("Disconnected, holy crap!");
        console.log("Gonna try to reconnect now... ");
        bot.sendMessage('184654472465743872', "Bot has gone offline and trying to reconnect!")
        bot.setStatusOnline();
    })
}

bot.loginWithToken(process.env.CLIENT_ID, function (token, err) {
    if(err){
        console.log(err);
    }

    //reconnect();
    searchGrimoire();    
    searchCard();
    searchItems();
    
});