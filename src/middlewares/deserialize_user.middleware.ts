/* eslint-disable @typescript-eslint/no-unused-vars */
import UserModel from '@src/models/User.model';
import { UnauthorizedError } from '@src/responses';
import { verifyJwt } from '@src/utils';
import type { NextFunction, Request, Response } from 'express';

class DeserializeUser {
  static deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      let access_token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        access_token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.access_token) {
        access_token = req.cookies.access_token;
      }

      if (!access_token) {
        return next(new UnauthorizedError('You are not logged in', undefined));
      }

      // Validate the access token
      const decoded = verifyJwt<{ sub: string }>(
        access_token,
        'accessTokenPublicKey',
      );

      if (!decoded) {
        return next(
          new UnauthorizedError(
            `Invalid token or user doesn't exist`,
            undefined,
          ),
        );
      }

      const User = new UserModel();
      const { sub } = decoded;

      // Check if the user still exist
      const user = await User.findOne({ id: sub });

      if (!user) {
        return next(
          new UnauthorizedError(
            `Invalid token or session has expired`,
            undefined,
          ),
        );
      }

      // Add user to res.locals
      res.locals.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default DeserializeUser;
