import { OKResponse } from '@src/responses';
import { GetUniqueUserInput } from '@src/schemas';
import { UserService } from '@src/services';
import type { Request, Response } from 'express';

class UserController {
  getUserById = async (
    req: Request<
      Record<string, never>,
      Record<string, never>,
      GetUniqueUserInput
    >,
    res: Response,
  ) => {
    const { id } = req.params;
    const response = await UserService.getUserById(+id);
    return new OKResponse({
      message: `Get user by id = \`${id}\` successfully`,
      metadata: response,
    }).send(res);
  };
}

export default new UserController();
