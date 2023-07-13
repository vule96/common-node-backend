import { User } from '@src/models/User.model';
import c from 'config';
import jwt, { type SignOptions } from 'jsonwebtoken';

const configJWT = c.get<{
  accessTokenPrivateKey: string;
  refreshTokenPrivateKey: string;
  accessTokenPublicKey: string;
  refreshTokenPublicKey: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}>('jwt');

export const signTokens = async (user: User) => {
  // Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${configJWT['accessTokenExpiresIn']}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${configJWT['refreshTokenExpiresIn']}m`,
  });

  return { access_token, refresh_token };
};

export const signJwt = (
  payload: object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions,
) => {
  const privateKey = Buffer.from(configJWT[keyName], 'base64').toString(
    'ascii',
  );
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    allowInsecureKeySizes: true,
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey',
): T | null => {
  try {
    const publicKey = Buffer.from(configJWT[keyName], 'base64').toString(
      'ascii',
    );
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
