const tmi = require('tmi.js');

// TODO: add db connection

const botName = process.env.BOT_NAME;
const botOauth = process.env.BOT_OAUTH;
const lookFor = process.env.LOOK_FOR_USER.split(',');
const lookIn = process.env.LOOK_IN_CHANNEL.split(',');

const client = new tmi.Client({
	identity: {
		username: botName,
		password: botOauth
	}
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    if (self) return;
    if (lookFor.includes(tags.username)) {
        const msg = { 
            username: tags.username,
            channel: channel,
            message: message,
            // timestamp: (don't know if a timestamp exists in tags)
        };
        // TODO: save msg to db
    }
});

