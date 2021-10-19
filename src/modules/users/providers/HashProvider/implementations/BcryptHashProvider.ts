import bcrypt from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  public async compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
