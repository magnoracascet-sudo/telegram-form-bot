require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/send-form', async (req, res) => {

    try {

        const {
            name,
            phone,
            region
        } = req.body;

        const text = `
📨 Новая заявка с сайта

👤 Имя: ${name}
📞 Телефон: ${phone}
🌍 Регион: ${region}
        `;

        await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: text
            }
        );

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});