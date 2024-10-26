#! /bin/bash

echo "Instalando dependências do frontend..."
cd frontend/ChatSiteUFPI && npm install

echo "Instalando dependências do backend..."
cd ../../backend && npm install

echo "Todas as dependências foram instaladas!"
