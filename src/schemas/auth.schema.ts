import { TypeOf, object, string } from 'zod';

export const RegisterSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    first_name: string({
      required_error: 'First name is required',
    })
      .min(2, 'First name must be more than 2 characters')
      .max(64, 'First name must be less than 64 characters'),
    last_name: string({
      required_error: 'Last name is required',
    })
      .min(2, 'Last name must be more than 2 characters')
      .max(64, 'Last name must be less than 64 characters'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(64, 'Password must be less than 64 characters'),
    password_confirm: string({
      required_error: 'Please confirm your password',
    }),
  }).refine((data) => data.password === data.password_confirm, {
    path: ['password_confirm'],
    message: 'Passwords do not match',
  }),
});

export type RegisterInput = Omit<
  TypeOf<typeof RegisterSchema>['body'],
  'password_confirm'
>;
