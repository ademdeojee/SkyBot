const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
var capmode = false;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.author.bot) return;
    switch (message.content) {
        case 'ping':
            console.log(message.member.user.id);
            message.channel.send('pong');
            break;
        case 'he is capping again':
            message.channel.send('capmode activated');
            capmode = true;
            break;
        case 'when?': message.channel.send('when did i ask?'); break;
        case 'who?': message.channel.send('who asked?'); break;
        case 'why?': message.channel.send('why should i care?'); break;
        case 'how?': message.channel.send('how many fucks do i give?'); break;
        case 'what?': message.channel.send('whatever'); break;
    }

    if (message.member.user.id === '362539219517964288' || message.member.user.tag == "Swaghetti Yolonese#4059" && capmode) {
        message.reply("that's cap");
        message.react('🧢');
    }
    else if (!message.content.startsWith(config.prefix)) return;

    let args = message.content.substring(config.prefix.length).split(" ");

    switch (args[0]) {

    }

});

client.login(config.token);
