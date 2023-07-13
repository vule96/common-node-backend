import { TypeOf, object, string } from 'zod';

export const GetUniqueUserSchema = object({
  params: object({
    id: string().refine((val) => parseInt(val), {
      message: 'User id is required',
    }),
  }),
});

export type GetUniqueUserInput = TypeOf<typeof GetUniqueUserSchema>['params'];
