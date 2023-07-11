import app from '@src/app';
import c from 'config';
import 'dotenv/config';

const PORT = c.get<number>('port');

const server = app.listen(PORT, () => {
  // log.info(`server on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log('Exits servers.'));
});
