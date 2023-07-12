import UserModel, { User } from '@src/models/User.model';
import { NotFoundRequestError } from '@src/responses';

class UserService {
  static getUserById = async (id: number) => {
    const User = new UserModel();

    const result = await User.findOne<User>({ id: id }, '-password');

    if (!result) {
      throw new NotFoundRequestError(`User not found with id = \`${id}\``);
    }

    return result;
  };
}

export default UserService;
