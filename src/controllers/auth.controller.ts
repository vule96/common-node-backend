import { CreatedResponse, OKResponse } from '@src/responses';
import { LoginInput, RegisterInput } from '@src/schemas';
import { AuthService } from '@src/services';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '@src/utils';
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

  login = async (
    req: Request<Record<string, never>, Record<string, never>, LoginInput>,
    res: Response,
  ) => {
    const body = req.body;
    const response = await AuthService.login(body);

    const { access_token, refresh_token } = response;

    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return new OKResponse({
      message: 'Login successfully',
      metadata: response,
    }).send(res);
  };
}

export default new AuthController();
