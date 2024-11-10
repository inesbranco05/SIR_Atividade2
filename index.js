import express from 'express';
import path from 'path';
import { Low, JSONFile } from 'lowdb'; // Usando lowdb para persistência
import studentsRoutes from './routes/students.js';

const app = express();
const port = 3000;

// Função assíncrona para configurar o banco de dados
const setupDatabase = async () => {
  const db = new Low(new JSONFile('db.json')); // Usando JSONFile para persistência
  await db.read();
  if (!db.data) db.data = { students: [] }; // Inicializando o banco se não existir dados
  return db;
};

// Configuração para permitir o recebimento de JSON
app.use(express.json());

// Servir arquivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(path.resolve(), 'public')));  // Caminho absoluto para os arquivos estáticos

// Inicializando o banco de dados e passando para as rotas
setupDatabase().then(db => {
  // Passando o app e db para as rotas
  studentsRoutes(app, db);

  // Rota para servir a página HTML
  app.get('/', (req, res) => {
    const filePath = path.join(path.resolve(), 'public', 'table.html');
    res.sendFile(filePath); // Servir o arquivo HTML
  });

  // Iniciar o servidor
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Erro ao configurar o banco de dados:", err);
});
