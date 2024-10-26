#! /bin/bash

# Instalando dependências do frontend
echo "Instalando dependências do frontend..."
cd frontend/ChatSiteUFPI && npm install

# Instalando dependências do backend
echo "Instalando dependências do backend..."
cd ../../backend && npm install

# Iniciando o backend em um novo terminal
echo "Iniciando o backend..."
gnome-terminal -- bash -c "node server.js; exec bash"

# Iniciando o frontend
echo "Iniciando o frontend..."
cd ../../frontend/ChatSiteUFPI && npm run dev &

# Atraso para garantir que o frontend esteja rodando
sleep 5

# Abrindo o navegador no link
echo "Abrindo o navegador em http://localhost:5173/"
xdg-open http://localhost:5173/

echo "Todas as dependências foram instaladas e os servidores foram iniciados!"
