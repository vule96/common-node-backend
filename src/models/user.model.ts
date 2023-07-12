import Model from '@src/helpers/model.helper';
import { RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  status: number;
  created_at?: string;
  updated_at?: string;
}

class UserModel extends Model {
  protected table: string = 'Users';
  protected primaryKey: string = 'id';
  protected fillables: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'phone',
    'password',
    'status',
  ];
  protected timestamps: boolean = false;

  // public getRoles = async (id: number) => {
  //   const permissions = await this.executeQuery<Role>('getUerRolesByUserId', [
  //     id,
  //   ]);

  //   return permissions as unknown as Array<Role>;
  // };
}

export default UserModel;
