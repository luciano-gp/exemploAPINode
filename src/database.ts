import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

client.connect()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch((err: unknown) => console.error('Erro ao conectar ao banco de dados:', err));

export default client;