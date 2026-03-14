const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// CONFIGURATION (Use the same values you used in Step 1)
const API_URL = "https://evolution-api-q286.onrender.com"; 
const API_KEY = "ishani0000"; 
const INSTANCE = "bot-01"; 

app.post('/webhook', async (req, res) => {
    const data = req.body.data;

    // 1. Safety check: Ignore if message is sent by the bot itself
    if (data.key.fromMe) return res.sendStatus(200);

    // 2. Extract message text
    const messageText = data.message?.conversation || data.message?.extendedTextMessage?.text;
    const remoteJid = data.key.remoteJid;

    console.log(`New message from ${remoteJid}: ${messageText}`);

    // 3. Simple Reply Logic
    if (messageText?.toLowerCase() === 'ping') {
        await axios.post(`${API_URL}/message/sendText/${INSTANCE}`, {
            number: remoteJid,
            text: "Pong! 🏓"
        }, { headers: { 'apikey': API_KEY } });
    }

    res.sendStatus(200);
});

app.listen(3000, () => console.log("Brain is running on port 3000"));