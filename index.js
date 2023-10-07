import * as tmi from 'tmi.js';
import pg from 'pg';

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

client.on('message', async (channel, tags, message, self) => {
    if (self) return;
    if (!lookFor.includes(tags.username)) return;
    // pg sanatizes the inputs, so no need to worry about sql injection
    try {
        const res = await dbClient.query('INSERT INTO messages (timestamp, channel, user, content, display_name) VALUES ($1, $2, $3, $4, $5)',
            [tags['tmi-sent-ts'], channel, tags.username, message, tags['display-name']]);
        console.log(`Inserted ${res.rowCount} rows.`);
    }
    catch (err) {
        console.error(err);
    }
});

process.on('exit', () => {
    console.log('Closing DB connection.');
    dbClient.end();
    console.log('Disconnecting from Twitch.');
    client.disconnect();
});
