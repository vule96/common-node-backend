import Express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = Express();

// middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));

// // routes
// app.use("/", route);

// // catch error 404
// app.use(AppMiddleware.catchError404API);

// // catch error server.
// app.use(AppMiddleware.catchInterServerError);

export default app;
