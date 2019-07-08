"use strict";

if (!process.env.TOKEN) {
  require("dotenv").config();
}

const destiny = require("./scripts/Destiny/destiny");
const halo = require("./scripts/Halo/halo");
const es = require("./scripts/ES");
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
  let halo_channels = [];
  let es_channel = channels.find(
    ch => ch.name === process.env.elderScrollsChannel
  );

  console.log("List of Servers currently running LoreBot: ");

  guilds.map(function(x) {
    console.log(x.name);

    let halo_channel = x.channels.find(ch => ch.name === "lore__halo");

    // If a Guild/Server is running LoreBot has a '#lore__halo' channel, add it
    if (halo_channel) {
      halo_channels.push(halo_channel);
    }
  });

  setInterval(function() {
    let timestamp = new Date();

    if (timestamp.getHours() === 14) {
      halo.haloRequest(function(err, motd) {
        if (err) {
          return console.error(err);
        }
        halo_channels.map(function(x) {
          x.send(motd).catch(console.error);
        });
      });

      es.ElderScrolls((err, motd) => {
        if (err) {
          console.error(err);
        }
        es_channel.send(motd).catch(console.error);
      });
    }
  }, 1000 * 60 * 60);
  // }, 1000 * 10); // Testing Locally
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
