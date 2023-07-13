import { UserController } from '@src/controllers';
import { RequestMiddleware } from '@src/middlewares';
import { GetUniqueUserSchema } from '@src/schemas';
import { Router } from 'express';

const route = Router();

route.get(
  '/:id',
  RequestMiddleware.validateResource(GetUniqueUserSchema),
  RequestMiddleware.catchErrorRequest(UserController.getUserById),
);

export default route;
