import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

export type DbDefaults =
  | RowDataPacket[]
  | RowDataPacket[][]
  // | OkPacket
  // | OkPacket[]
  | ResultSetHeader
  | FieldPacket[];

export type DBResponseQuery = ResultSetHeader;

export type DbQueryResult<T> = T & DbDefaults;
