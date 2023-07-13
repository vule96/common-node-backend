import log from '@src/utils/logger';
import { Server } from 'http';
import { HttpTerminator } from 'http-terminator';

export const createExitHandler =
  (server: Server, httpTerminator: HttpTerminator) =>
  async (code: number, timeout = 5000) => {
    try {
      log.info(`Start graceful shutdown with code ${code}`);

      setTimeout(() => {
        log.info(`Force shutdown with code ${code}`);
        process.exit(code);
      }, timeout).unref();

      if (server?.listening ?? false) {
        log.info('Terminate HTTP connections');
        await httpTerminator?.terminate();
      }

      log.info(`End graceful shutdown`);
      process.exit(code);
    } catch (error) {
      log.error('Error graceful shutdown');
      log.error(error);
      log.info(`Force shutdown with code ${code}`);
      process.exit(code);
    }
  };
