const fs = require('fs');
const path = require('path');

// Caminho onde o arquivo será criado na Vercel durante o build
const dirPath = path.join(__dirname, 'src', 'environments');
const filePath = path.join(dirPath, 'environment.prod.ts');

// Garante que a pasta 'src/environments' exista
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Conteúdo que lerá a variável injetada pelo painel da Vercel
const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${process.env.ANGULAR_APP_API_URL || "https://onrender.com"}'
};
`;

fs.writeFileSync(filePath, envConfigFile, 'utf8');
console.log(`✅ Arquivo environment.prod.ts gerado com sucesso para a Vercel.`);