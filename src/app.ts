import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import AppMiddleware from './middlewares/app.middleware';
import routes from './routes';

const app = Express();

// middlewares
app.use(Express.json());

// parse urlencoded request body
app.use(Express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

app.use(helmet());
app.use(morgan('dev'));

// enable cors
app.use(cors());
app.options('*', cors());

app.use(cookieParser());

// v1 api routes
app.use('/api/v1', routes);

// catch error 404
app.use(AppMiddleware.catchError404API);

// catch error server
app.use(AppMiddleware.catchInterServerError);

export default app;
