import authController from '@src/controllers/auth.controller';
import { RequestMiddleware } from '@src/middlewares';
import { LoginSchema, RegisterSchema } from '@src/schemas';
import { Router } from 'express';

const route = Router();

route.post(
  '/register',
  RequestMiddleware.validateResource(RegisterSchema),
  RequestMiddleware.catchErrorRequest(authController.register),
);

route.post(
  '/login',
  RequestMiddleware.validateResource(LoginSchema),
  RequestMiddleware.catchErrorRequest(authController.login),
);

export default route;
