import { AuthController } from '@src/controllers';
import { RequestMiddleware } from '@src/middlewares';
import DeserializeUser from '@src/middlewares/deserialize_user.middleware';
import { LoginSchema, RegisterSchema } from '@src/schemas';
import { Router } from 'express';

const route = Router();

route.post(
  '/register',
  RequestMiddleware.validateResource(RegisterSchema),
  RequestMiddleware.catchErrorRequest(AuthController.register),
);

route.post(
  '/login',
  RequestMiddleware.validateResource(LoginSchema),
  RequestMiddleware.catchErrorRequest(AuthController.login),
);

route.get(
  '/logout',
  DeserializeUser.deserializeUser,
  RequestMiddleware.catchErrorRequest(AuthController.logout),
);

export default route;
