// src/index.ts
import { createServer } from 'http';
import app from './app.js';

const server = createServer(app);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
