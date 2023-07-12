import 'dotenv/config';
import app from '@src/app';
import c from 'config';
import log from './utils/logger';

const PORT = c.get<number>('port');

const server = app.listen(PORT, () => {
  log.info(`server on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() =>
    log.info(`Process ${process.pid} received SIGINT: Exiting with code 0`),
  );
});

// process.on('SIGTERM', async () => {
//   logger.info(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
//   await redisClient.disconnect();
//   void exitHandler(0);
// });
