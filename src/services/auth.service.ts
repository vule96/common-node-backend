import UserModel from '@src/models/User.model';
import { ConflictRequestError } from '@src/responses';
import { RegisterInput } from '@src/schemas';
import { hashPassword } from '@src/utils';
import { UserService } from '.';

class AuthService {
  static register = async (data: RegisterInput) => {
    const User = new UserModel();

    if (await User.findOne({ email: data.email })) {
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
}

export default AuthService;
