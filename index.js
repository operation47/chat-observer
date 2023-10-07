import * as tmi from 'tmi.js';
import * as pg from 'pg';

// TODO: add db connection

const botName = process.env.BOT_NAME;
const botOauth = process.env.BOT_OAUTH;

const lookFor = ['username1', 'username2'];
const lookIn = ['channel1', 'channel2'];

if (!process.env.BOT_NAME || !process.env.BOT_OAUTH) {
  console.error('One or more required environment variables are missing.');
  process.exit(1);
}

const dbClient = new pg.Client();
await dbClient.connect();
console.log('Connected to DB');

const client = new tmi.Client({
	identity: {
		username: botName,
		password: botOauth
	}
});

await client.connect();
console.log('Connected to Twitch');

for (const channel of lookIn) {
    console.log(`Joining ${channel}`);
    client.join(channel);
}

client.on('message', (channel, tags, message, self) => {
    if (self) return;
    if (!lookFor.includes(tags.username)) return;
    const entry = { 
        username: tags.username,
        channel: channel,
        displayName: tags['display-name'],
        message: message,
        timestamp: tags['tmi-sent-ts']
    };
    console.log(entry);
});

