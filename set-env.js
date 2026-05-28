const fs = require('fs');
const path = require('path');

// Caminhos dos arquivos
const dirPath = path.join(__dirname, 'src', 'environments');
const prodFilePath = path.join(dirPath, 'environment.prod.ts');
const devFilePath = path.join(dirPath, 'environment.ts');

// Garante que a pasta 'src/environments' exista na Vercel
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Captura a URL da Vercel ou usa a padrão do Render
const apiUrlValue = process.env.ANGULAR_APP_API_URL;

// Conteúdo dos arquivos
const prodEnvContent = `export const environment = {
  production: true,
  apiUrl: '${apiUrlValue}'
};
`;

const devEnvContent = `export const environment = {
  production: false,
  apiUrl: '${apiUrlValue}'
};
`;

// Escreve os dois arquivos fisicamente no servidor de build da Vercel
try {
  fs.writeFileSync(prodFilePath, prodEnvContent, 'utf8');
  fs.writeFileSync(devFilePath, devEnvContent, 'utf8');
  console.log('✅ Arquivos environment.ts e environment.prod.ts gerados na Vercel!');
} catch (err) {
  console.error('❌ Erro ao gerar os arquivos de ambiente:', err);
  process.exit(1);
}