import UserModel, { User } from '@src/models/User.model';
import { ConflictRequestError, ForbiddenRequestError } from '@src/responses';
import { LoginInput, RegisterInput } from '@src/schemas';
import { hashPassword, signJwt, signTokens, verifyJwt } from '@src/utils';
import { compare } from 'bcrypt';
import c from 'config';
import { UserService } from '.';

const configJWT = c.get<{
  accessTokenExpiresIn: number;
}>('jwt');

class AuthService {
  static register = async (data: RegisterInput) => {
    const User = new UserModel();

    if (await User.findOne({ email: data.email.toLowerCase() })) {
      throw new ConflictRequestError('Email already exists');
    }

    const { password, email, first_name, last_name } = data;

    const passwordHash = await hashPassword(password);

    const userId = await User.create({
      email,
      password: passwordHash,
      first_name,
      last_name,
    });

    return await UserService.getUserById(userId);
  };

  static login = async (data: LoginInput) => {
    const User = new UserModel();

    const { password } = data;

    const user = await User.findOne<User>({ email: data.email.toLowerCase() });

    if (!user || !(await compare(password, user.password))) {
      throw new ConflictRequestError(`Invalid email or password`);
    }

    // Sign Tokens
    const { access_token, refresh_token } = await signTokens(user);

    return {
      access_token,
      refresh_token,
    };
  };

  static refreshToken = async (refresh_token: string) => {
    const message = 'Could not refresh access token';

    if (!refresh_token) {
      throw new ForbiddenRequestError(message);
    }

    // Validate refresh token
    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'refreshTokenPublicKey',
    );

    if (!decoded) {
      throw new ForbiddenRequestError(message);
    }

    // Sign new access token
    const access_token = signJwt(
      { sub: decoded.sub },
      'accessTokenPrivateKey',
      {
        expiresIn: `${configJWT['accessTokenExpiresIn']}m`,
      },
    );

    return access_token;
  };
}

export default AuthService;
