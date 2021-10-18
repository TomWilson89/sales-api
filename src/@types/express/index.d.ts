declare namespace Express {
  export interface Request {
    user: import('@modules/users/typeorm/entities/User').IUser;
  }
}
