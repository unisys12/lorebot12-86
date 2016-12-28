lorebot12-86
============
[![Build Status](https://travis-ci.org/unisys12/lorebot12-86.svg?branch=testing)](https://travis-ci.org/unisys12/lorebot12-86)
Discord Bot, for use by Focused Fire Chat on their public Discord server.

Enter `!search` followed by a term or phrase you want to research from the Destiny Grimoire and it will return a link from www.ishtar-collective.net containing the results of your query.

Example: `!search reef wars`
will return a message like so to the user in the chat window "@Unisys12, http://www.ishtar-collective.net/search/reef%20wars" to the chat window.

###Adding This Bot to Your Server
This bot was written for use by Focused Fire Chat on their Discord server. For a link that will add this bot to your Discord server, e-mail me at unisys12@gmail.com.

**LoreBot Help Menu**

**__Search Ishtar by Topic__**
**!search** *your search topic*
ex: `!search osiris`
This will return a link such as - ishtar-collective.net/search/osiris

**__Search Ishtar for Grimoire Card__**
**!search** *exact name of card you want to show in chat*
ex: `!card osiris`
This will return a link to the card, with first 50 or so characters and image of card. If not, then no card name matched your query. The link provided will still take you to Ishtar and give suggestions based on your query.

**__Search Ishtar for Item__**
**!item** *item you want to show in chat*
ex: `!item ace of spades`
This will, like the card method, return a link to the item or weapon along with the flavor text and an image of the item. If not, then your search did not match. Follow the link to Ishtar and check if it's suggestions match what you were looking for.

**__NPC Quotes__**
**!quotes** *the person your wanting the quotes from*
ex: `!quotes mara`
This will return a random quote, which is pulled from `./assets/<persons name>.js`.

**__Display Help Menu__**
`!lorehelp` - Displays this help menu

**Quotes Help**
As a side note, if you enter `!quotes list` in either a DM or chat, LoreBot 12-86 will send you a DM with a separate help menu that will aid/assist you in enter your NPC quotes.
