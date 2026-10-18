import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { generateUpcycleDesign } from './src/services/upcycleDesign';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// API endpoint for Gemini-powered Upcycle Studio
app.post('/api/gemini/upcycle-design', async (req, res) => {
  res.json(await generateUpcycleDesign(req.body, process.env.GEMINI_API_KEY));
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`TRIFEST server listening on port ${port}`);
  });
}

startServer();
