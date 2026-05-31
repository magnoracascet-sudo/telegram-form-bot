require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

console.log('BOT_TOKEN:', BOT_TOKEN ? 'OK' : 'MISSING');
console.log('CHAT_ID:', CHAT_ID ? 'OK' : 'MISSING');

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/send-form', async (req, res) => {

    try {

        const { name, phone, region } = req.body || {};

        const text = `
📨 Новая заявка с сайта

👤 Имя: ${name}
📞 Телефон: ${phone}
🌍 Регион: ${region}
`;

        const result = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text
            }
        );

        console.log(result.data);

        res.json({
            success: true
        });

    } catch (error) {

        console.error(
            error.response?.data || error.message
        );

        res.status(500).json({
            success: false
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});