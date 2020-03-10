"use strict";

if (!process.env.TOKEN) {
  require("dotenv").config();
}

const destiny = require("./scripts/Destiny/destiny");
const Ishtar = require("./scripts/Ishtar");
const scripts = require("./scripts/scripts");
const Discord = require("discord.js");
const bot = new Discord.Client();

let connect = () => {
  bot.login(process.env.TOKEN, (token, err) => {
    if (err) {
      console.log(err);
    }
  });
};

connect();

bot.once("ready", function() {
  console.log("LoreBot12-86 is ready and running!");

  bot.user.setActivity("Brought to you by FFC");

  //Today In Halo
  let channels = bot.channels;
  let guilds = bot.guilds;

  let total_active = guilds.size;

  console.log(`List of Servers currently running LoreBot: ${total_active}`);

  guilds.forEach(function(x) {
    console.log(x.name);
  });
});

bot.on("message", function(message) {
  let input = message.content;
  let channel = message.channel;
  let user = message.author;

  let quoteCmd = input.startsWith("!quotes");
  let helpCmd = input.startsWith("!lorehelp");
  let itemCmd = input.startsWith("!item");
  let cardCmd = input.startsWith("!card");
  let siteCmd = input.startsWith("!search");
  let entriesCmd = input.startsWith("!entries");

  let reply = function(err, msg) {
    if (err) {
      return message.reply("something went wrong ```" + err + "```");
    } else {
      return channel.send(msg);
    }
  };

  if (quoteCmd) {
    if (input.indexOf("help") != -1) {
      user.send(destiny.quotesHelp());
    } else {
      destiny.quotes(input, reply);
    }
  }

  if (itemCmd) {
    message.reply(destiny.searchItems(input));
  }
  if (helpCmd) {
    user.send(destiny.help(input));
  }
  if (cardCmd) {
    message.reply(destiny.searchCard(input));
  }
  if (siteCmd) {
    message.reply(destiny.searchGrimoire(input));
  }
  if (entriesCmd) {
    message.reply(Ishtar.loreEntry(input));
  }
});

bot.on("error", function(error) {
  console.log("LoreBot returned an error: ", error);
});

bot.on("disconnect", function(e) {
  console.log("LoreBot12-86 has disconnected from Discord Services", e);

  if (e.code != 1000 || e.reason.length < 1) {
    bot.destroy().then(connect());
  }
});
