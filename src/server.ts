import 'dotenv/config';
import app from '@src/app';
import c from 'config';
import http from 'http';
import { createHttpTerminator } from 'http-terminator';
import { createExitHandler } from './utils';
import log from './utils/logger';

const PORT = c.get<number>('port');

const server = http.createServer(app);
const httpTerminator = createHttpTerminator({ server });

const exitHandler = createExitHandler(server, httpTerminator);

process.on('SIGTERM', async () => {
  log.info(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
  void exitHandler(0);
});

process.on('SIGINT', async () => {
  log.info(`Process ${process.pid} received SIGINT: Exiting with code 0`);
  void exitHandler(0);
});

const bootstrap = async (): Promise<void> => {
  try {
    server.listen(PORT, () => {
      log.info(`server on http://localhost:${PORT}`);
    });
  } catch (error) {
    log.error(`Server bootstrap error. %o`, error);
    void exitHandler(1);
  }
};

void bootstrap();
