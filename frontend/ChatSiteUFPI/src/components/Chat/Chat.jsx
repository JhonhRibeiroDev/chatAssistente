import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chat.css'; // Estilos do componente

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null); // Ref para o final da lista de mensagens

    const handleSend = async () => {
        if (!input) return;

        const newMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');

        // Função para chamar a API do backend
        const fetchResponse = async (prompt) => {
            try {
                const response = await axios.post('http://localhost:3000/generate', { prompt });

                // Log para verificar a estrutura da resposta
                console.log('Resposta da API:', response.data);

                // Acessando a resposta da API
                const { candidates } = response.data; // Acessa o array de candidates

                if (candidates && candidates.length > 0) {
                    const botMessage = { text: candidates[0].content.parts[0].text, sender: 'bot' };
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                } else {
                    // Mensagem padrão se a resposta não estiver conforme o esperado
                    const errorMessage = { text: "Desculpe, não consegui entender a resposta.", sender: 'bot' };
                    setMessages((prevMessages) => [...prevMessages, errorMessage]);
                }
            } catch (error) {
                console.error('Erro ao enviar a mensagem:', error);
                const errorMessage = { text: "Erro ao se comunicar com o servidor.", sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            }
        };

        // Chama a função para obter a resposta do assistente
        await fetchResponse(input);
    };

    // Efeito para rolar até a última mensagem
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]); // Dependência em messages para rolar sempre que mudar

    // Função para lidar com a tecla pressionada
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend(); // Chama a função de enviar mensagem
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <span>{msg.sender === 'user' ? 'Você:' : 'Bot:'} </span>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* Referência para o final das mensagens */}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown} // Adiciona o evento onKeyDown
                    placeholder="Digite sua dúvida..."
                />
                <button onClick={handleSend}>Enviar</button>
            </div>
        </div>
    );
};

export default Chat;
