declare namespace Express {
  export interface Request {
    user: import('@modules/users/infra/typeorm/entities/User').IUser;
  }
}
