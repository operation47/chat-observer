const tmi = require('tmi.js');

const port = process.env.PORT || 3000;
const botName = process.env.BOT_NAME;
const botOauth = process.env.BOT_OAUTH;

const client = new tmi.Client({
	identity: {
		username: botName,
		password: botOauth
	}
});

client.connect();

client.on('message', (channel, tags, message, self) => {
});

