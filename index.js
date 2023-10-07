import * as tmi from 'tmi.js';
import pg from 'pg';

const client = new pg.Client();
await client.connect();
console.log('Connected to DB');
/*
const isProduction = false;//process.env.NODE_ENV === 'production';
const botName = process.env.BOT_NAME;
const botOauth = process.env.BOT_OAUTH;

let client;
const lookFor = ['swox___', 'username2'];
const lookIn = ['stegi', 'channel2'];

if (!process.env.BOT_NAME || !process.env.BOT_OAUTH) {
    console.error('No bot name or oauth token provided, logging in anonymously.');
    client = new tmi.Client();
}
else {
    client = new tmi.Client({
        identity: {
            username: botName,
            password: botOauth,
        },
    });
}

const dbClient = new pg.Client();
await dbClient.connect();
console.log('Connected to DB');

await client.connect();
console.log('Connected to Twitch.');

for (const channel of lookIn) {
    console.log(`Joining ${channel}.`);
    client.join(channel);
}

client.on('message', (channel, tags, message, self) => {
    if (self) return;
    if (!lookFor.includes(tags.username)) return;
    const entry = { 
        timestamp: tags['tmi-sent-ts'],
        channel: channel,
        user: tags.username,
        content: message,
        displayName: tags['display-name'],
    };
    console.log(JSON.stringify(entry));
});
*/
