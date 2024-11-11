import express, { Request, Response } from 'express';
import client from './database';

const router = express.Router();

router.post('/categorias', async (req: Request, res: Response) => {
  const { categoria } = req.body;
  try {
    const result = await client.query('INSERT INTO categorias (categoria) VALUES ($1) RETURNING *', [categoria]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar categoria' });
  }
});

router.get('/categorias', async (_, res: Response) => {
  try {
    const result = await client.query('SELECT * FROM categorias');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter categorias' });
  }
});

router.get('/categorias/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await client.query('SELECT * FROM categorias WHERE id = $1', [id]);
    
      if (result.rows.length === 0) {
        res.status(404).json({ erro: 'Categoria não encontrada' });
      }
    
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao obter categoria' });
    }
});

router.put('/categorias/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoria } = req.body;
  try {
    await client.query('UPDATE categorias SET categoria = $1 WHERE id = $2', [categoria, id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar categoria' });
  }
});

router.delete('/categorias/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await client.query('DELETE FROM categorias WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar categoria' });
  }
});

export default router;