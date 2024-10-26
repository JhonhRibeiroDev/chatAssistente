// eslint-disable-next-line no-unused-vars
import React from 'react';
import Chat from './components/Chat/Chat';
import './App.css';

const App = () => {
    return (
        <div className='app'>
            <header className='header'>
                <h1>🤖 Chat STI</h1>
                <p>Assistente virtual para tirar dúvidas sobre o site da UFPI</p>
            </header>

            <main className='main-content'>
                <Chat />
            </main>

            <footer className='footer'>
                <p>© 2024 Universidade Federal do Piauí - STI. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default App;
