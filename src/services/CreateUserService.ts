import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const hashPassword = await hash(password, 8);

    // busca informações no banco
    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    // verifica se existe o email no banco e retorna erro
    if (checkUserExists) {
      throw new AppError('E-mail address already used.');
    }

    // cria uma instância para ser salvo no banco
    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    // salva a instância no banco
    await userRepository.save(user);

    return user;
  }
}
