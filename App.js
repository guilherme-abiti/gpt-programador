const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota para processar perguntas
app.post('/ask', async (req, res) => {
    const userQuestion = req.body.user_question;

    try {
        // Chamada à API de OpenAI 
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: `Um programador pergunta: ${userQuestion}\nResposta:`,
                max_tokens: 150
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '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'
                }
            }
        );

        const answer = response.data.choices[0].text.trim();
        res.json({ answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao processar a pergunta.' });
    }
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
