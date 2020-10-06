const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const ytdl = require("ytdl-core");
var servers = {};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('typingStart', (channel, user) => {
    if (user.id === '362539219517964288') channel.send("you finna cap");
})

client.on('message', message => {
    if (message.author.bot) return;
    switch (message.content) {
        case 'ping':
            console.log(message.member.user.id);
            message.channel.send('pong');
            break;

        case 'when?': message.channel.send('when did i ask?'); break;
        case 'who?': message.channel.send('who asked?'); break;
        case 'why?': message.channel.send('why should i care?'); break;
        case 'how?': message.channel.send('how many fucks do i give?'); break;
        case 'what?': message.channel.send('whatever'); break;
    }

    if (message.member.user.id === '362539219517964288') {
        message.channel.send("that's cap");
        message.react('🧢');
    }
    else if (!message.content.startsWith(config.prefix)) return;

    let args = message.content.substring(config.prefix.length).split(" ");

    switch (args[0]) {
        case 'play':
            function play(connection, message) {
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));

                server.queue.shift();

                server.dispatcher.on("end", function () {
                    if (server.queue[0]) {
                        play(connection, message);
                    }
                    else {
                        connection.disconnect();
                    }
                });
            }

            if (!args[1]) {
                message.channel.send("play what bro?? are you dumb?");
                return;
            }
            if (!message.member.voice.channel) {
                message.channel.send("what call do I join...???? nice one idiot");
                return;
            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voice.connection) message.member.voice.channel.join().then(function (connection) {
                play(connection, message);
            });
            break;

        case 'skip':
            var server = servers[message.guild.id];
            message.channel.send("Skipping...")
            if (server.dispatcher) server.dispatcher.end();
            break;
        case 'stop':
            var server = servers[message.guild.id];
            if (message.guild.voice.connection) {
                for (var i = server.queue.length - 1; i >= 0; i--) {
                    server.queue.splice(i, 1);
                }
                message.channel.send("Ending...")
                server.dispatcher.end();
            }

            if (message.guild.connection) message.guild.voice.connection.disconnect();
            break;
    }

});

client.login(config.token);
