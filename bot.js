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
  //Today In Halo
  let channels =  bot.channels;
  let lb_channel = channels.find('name', 'lorebot')
  let lb_id = channels.find('name', process.env.halo_channel).id

  if (lb_channel) {

    const google = require('googleapis');
    const sheet = google.sheets('v4');

    setInterval(function() {
      sheet.spreadsheets.values.get({
        key: process.env.googleSheetsKey,
        spreadsheetId: process.env.googleSheetID,
        range: process.env.googleSheetRange
      }, function(err, response) {
        if (err) {
          return new Error('Error accessing spreadsheet', err)
        }else{
          let rows = response.values;
          if (rows.length == 0) {
            return "No rows found! Something happend to the spreadsheet!!"
          }else{
            let message = halo.gatherMessage(rows)

              try {

                lb_channel.sendMessage(message)

              } catch (e) {

                throw( new Error('There was an error assembling your message: ' + e) )

              }
          }
        }
      });
    }, process.env.halo_timer);
  }
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
