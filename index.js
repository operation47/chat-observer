const express = require('express');
const tmi = require('tmi.js');

let joinedChannels = [];
let lookFor = [];
let messageList = [];

const port = process.env.PORT || 3000;
const botName = process.env.BOT_NAME;
const botOauth = process.env.BOT_OAUTH;

const app = express();

const client = new tmi.Client({
	identity: {
		username: botName,
		password: botOauth
	}
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    if (self) return;
    if (!lookFor.includes(tags.username)) return;

    messageList.push({
        user: tags.username,
        channel: channel,
        messages: []
    });
});

app.post('/api/v1/lookforuser', (req, res) => {
    if (!req.query.user) {
        res.status(400).send('Missing channel parameter');
        return;
    };
    if (lookFor.includes(req.query.user)) {
        res.status(400).send('Already looking for user');
        return;
    }
    lookFor.push(req.query.user);
    res.send('Looking for user');
});
app.get('/api/v1/join', (req, res) => {
    if (!req.query.channel) {
        res.status(400).send('Missing channel parameter');
        return;
    };
    if (joinedChannels.includes(req.query.channel)) {
        res.status(400).send('Already joined channel');
        return;
    }
    client.join(req.query.channel);
    joinedChannels.push(req.query.channel);
    res.send('Joined channel');
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
