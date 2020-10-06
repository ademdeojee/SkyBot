const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NzM0MjM3MTg4MjgzMTcwODQ5.XxOxqw.xxG9AiQ3rsB2dksCQ3VyyQBKquQ"
const PREFIX = "~"

const ytdl = require("ytdl-core");
var servers = {};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('typingStart', (channel, user) => {
    if (user.tag === '362539219517964288') channel.send("you finna cap");
})

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content === 'ping') {
        console.log(message.member.user.id);
        message.channel.send('pong');
    }
    if (message.content === 'when?') {
        message.channel.send('when did i ask?');
    }
    if (message.content === 'who?') {
        message.channel.send('who asked?');
    }
    if (message.content === 'why?') {
        message.channel.send('why should i care?');
    }
    if (message.content === 'how?') {
        message.channel.send('how many fucks do i give?');
    }
    if (message.content === 'what?') {
        message.channel.send('whatever');
    }
    else if (message.member.user.id === '362539219517964288') {
        message.channel.send("that's cap");
        message.react('🧢');
    }
    else if (!message.content.startsWith(PREFIX)) return;

    let args = message.content.substring(PREFIX.length).split(" ");

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

            if (!message.guild.voiceConnection) message.member.voice.channel.join().then(function (connection) {
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





client.login(token);
