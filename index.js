import * as tmi from 'tmi.js';
import fetch from 'node-fetch';

const botName = process.env.BOT_NAME;
const botOauth = process.env.BOT_OAUTH;

let client;
const lookFor = ['stegi', 'di1araas'];
const lookIn = ['stegi', 'di1araas'];

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

await client.connect();
console.log('Connected to Twitch.');

for (const channel of lookIn) {
    console.log(`Joining ${channel}.`);
    client.join(channel);
}

client.on('message', async (channel, tags, message, self) => {
    if (self) return;
    if (!lookFor.includes(tags.username)) return;

    const row = {
        unixTimestamp: tags['tmi-sent-ts'],
        channel: channel,
        username: tags.username,
        message: message,
        displayName: tags['display-name'],
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(row),
    };

    fetch('https://api.op47.de/v1/twitch/insertMessage', options);
});

process.on('exit', () => {
    console.log('Disconnecting from Twitch.');
    client.disconnect();
});
