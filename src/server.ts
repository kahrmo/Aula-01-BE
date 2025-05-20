import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/routes';
import { conectarBanco } from './instances/mysql';
import "./models/associations";

dotenv.config();

const server = express();

// Libera o CORS
server.use(cors());

// Conecta ao banco de dados
conectarBanco();

// Serve arquivos estáticos (HTML, CSS, JS) da pasta public/
server.use(express.static(path.join(__dirname, '../public')));

// Define o formato das requisições como JSON
server.use(express.json());

// Usa as rotas da API
server.use(apiRoutes);

// Rota para caminhos inexistentes
server.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Endpoint não encontrado.' });
});

// Middleware de erro
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err); // Exibe o erro no console
    res.status(400).json({ error: 'Ocorreu algum erro.' });
};
server.use(errorHandler);

// Inicia o servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

export default server;
