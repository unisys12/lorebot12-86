'use strict'

if (!process.env.TOKEN) {
    require('dotenv').config();
}

const destiny = require('./scripts/Destiny/destiny');
const halo = require('./scripts/Halo/halo');
const scripts = require('./scripts/scripts')
const Discord = require('discord.js');
const bot = new Discord.Client();


bot.login(process.env.TOKEN, function (token, err) {
  if(err){
      console.log(err);
  }
});

bot.on("ready", function() {
  console.log('LoreBot12-86 is ready and running!')

  //Today In Halo
  let channels =  bot.channels;
  let lb_channel = channels.find('name', 'lorebot')
  let lb_id = channels.find('name', process.env.halo_channel).id

  if (lb_channel) {

    setInterval(function() {
      halo.haloRequest(function (err, motd) {
        if (err) {
          return console.error(err);
        }
        lb_channel.sendMessage(motd).catch(console.error)
      });
    }, process.env.halo_timer)
  }
});

bot.on("message", function (message) {
    let input = message.content;
    let channel = message.channel
    let user = message.author

    let quoteCmd = input.startsWith('!quotes');
    let helpCmd = input.startsWith('!lorehelp');
    let itemCmd = input.startsWith('!item');
    let cardCmd = input.startsWith('!card');
    let siteCmd = input.startsWith('!search');

    let reply = function(err, msg) {
        if(err) {
          return message.reply('something went wrong ```' + err + '```');
        } else {
          return message.reply(msg);
        }
    };

    if (quoteCmd) { destiny.quotes(input, reply) }
    if (helpCmd) { user.sendMessage(destiny.help(input)) };
    if (itemCmd) { message.reply(destiny.searchItems(input)) };
    if (cardCmd) { message.reply(destiny.searchCard(input)) };
    if (siteCmd) { message.reply(destiny.searchGrimoire(input)) };
});

bot.on('error', function(error) {
  console.log(error);
})

bot.on('disconnect', function() {
  console.log('LoreBot12-86 has disconnected from Discord Services')
})
