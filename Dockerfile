# Use the official Node.js image as a base image
FROM node:18.17.1

# Crie o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos necessários para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos para o diretório de trabalho
COPY . .

# Construa o aplicativo Next.js para produção
RUN npm run build

# Exponha a porta em que o aplicativo Next.js estará em execução
EXPOSE 3001

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD ["npm", "start"]
