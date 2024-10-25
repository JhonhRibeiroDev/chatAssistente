// Importando as bibliotecas necessárias
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
dotenv.config();



dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use(cors()); 


// Definindo um roteiro como contexto
const context = `Responda com base no roteiro abaixo:
Você é um assistente técnico do STI, você foi criado para ajudar a criar e gerenciar o site da UFPI que foi feito usando Joomla.
para adicionar noticias você criar um artigo e adiconar um categoria a ele o passo a passo voce vai em artigos depois em novo digita oo titulo e depois adiciona a categoria.
 seu nome é Dexter,
  se não tiver a informação nesse texto diga de maneira educada que não sabe, mas esta aprendendo. você tem 1 anos de idade.
 Você foi criado por um dos bolsistas do STI chamado Francisco Jhonnatas.

`;

// Rota para gerar conteúdo
app.post('/generate', async (req, res) => {
    // Usando o contexto fixo em vez do prompt da requisição
    const prompt = req.body.prompt ? `${context} ${req.body.prompt}` : `${context} texto padrão.`;
    
    try {
        // Fazendo a chamada para a API do Google Generative AI
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`, {
            contents: [{
                parts: [{ text: prompt }]
            }]
        });
        
        // Retornando a resposta da API
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao chamar a API do Google Generative AI:', error);
        res.status(500).json({ error: 'Erro ao chamar a API do Google Generative AI' });
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('API_KEY:', process.env.API_KEY);
});
