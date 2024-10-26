// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chat.css'; // Estilos do componente

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false); // Estado para o carregamento
    const messagesEndRef = useRef(null); // Ref para o final da lista de mensagens

    const handleSend = async () => {
        if (!input) return;

        const newMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');
        setLoading(true); // Inicia o estado de carregamento

        const fetchResponse = async (prompt) => {
            try {
                const response = await axios.post('http://localhost:3000/generate', { prompt });

                console.log('Resposta da API:', response.data);

                const { candidates } = response.data;
                if (candidates && candidates.length > 0) {
                    const botMessage = { text: candidates[0].content.parts[0].text, sender: 'bot' };
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                } else {
                    const errorMessage = { text: "Desculpe, não consegui entender a resposta.", sender: 'Dexter' };
                    setMessages((prevMessages) => [...prevMessages, errorMessage]);
                }
            } catch (error) {
                console.error('Erro ao enviar a mensagem:', error);
                const errorMessage = { text: "Erro ao se comunicar com o servidor.", sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            } finally {
                setLoading(false); // Finaliza o estado de carregamento
            }
        };

        await fetchResponse(input);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <span>{msg.sender === 'user' ? 'Você:' : 'Dexter:'} </span>
                        {msg.text}
                    </div>
                ))}
                {loading && ( // Exibe o loader enquanto estiver carregando
                    <div className="message bot loading">
                        <span>Dexter: </span>Carregando...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite sua dúvida..."
                />
                <button onClick={handleSend}>Enviar</button>
            </div>
        </div>
    );
};

export default Chat;
