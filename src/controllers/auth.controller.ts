import { CreatedResponse } from '@src/responses';
import { RegisterInput } from '@src/schemas';
import { AuthService } from '@src/services';
import type { Request, Response } from 'express';

class AuthController {
  register = async (
    req: Request<Record<string, never>, Record<string, never>, RegisterInput>,
    res: Response,
  ) => {
    const body = req.body;
    const response = await AuthService.register(body);

    return new CreatedResponse({
      message: 'Register successfully',
      metadata: response,
    }).send(res);
  };
}

export default new AuthController();
