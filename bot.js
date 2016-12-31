'use strict'

if (!process.env.TOKEN) {
    require('dotenv').config();
}

const destiny = require('./scripts/Destiny/destiny');
const halo = require('./scripts/Halo/halo');
const Discord = require('discord.js');
const bot = new Discord.Client();


bot.login(process.env.TOKEN, function (token, err) {
  if(err){
      console.log(err);
  }
});

bot.on("ready", function() {
  // Today In Halo (Getting the rest working first)
  // let channel = bot.channels.get('name', 'lorebot').id;
  //
  // if (channel) {
  //   setInterval(function() {
  //     return haloRequest(channel)
  //   }, (1000*60)*24);
  // }
});

bot.on("message", function (message) {
    let input = message.content;

    let quoteCmd = input.startsWith('!quotes');
    let helpCmd = input.startsWith('!lorehelp');
    let itemCmd = input.startsWith('!item');
    let cardCmd = input.startsWith('!card');
    let siteCmd = input.startsWith('!search');

    if (quoteCmd) { destiny.quotes(input,message) };
    if (helpCmd) { destiny.help(input, message) };
    if (itemCmd) { destiny.searchItems(input, message) };
    if (cardCmd) { destiny.searchCard(input, message) };
    if (siteCmd) { destiny.searchGrimoire(input, message) };
});
