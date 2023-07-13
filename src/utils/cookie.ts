import c from 'config';
import { CookieOptions } from 'express';

export const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

const env = c.get<string>('env');
const configJWT = c.get<{
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}>('jwt');

if (env === 'production') cookiesOptions.secure = true;

export const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + configJWT['accessTokenExpiresIn'] * 60 * 1000),
  maxAge: configJWT['accessTokenExpiresIn'] * 60 * 1000,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + configJWT['refreshTokenExpiresIn'] * 60 * 1000,
  ),
  maxAge: configJWT['refreshTokenExpiresIn'] * 60 * 1000,
};
