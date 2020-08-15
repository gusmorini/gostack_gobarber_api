import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

import AppError from '../errors/AppError';

// DTO

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  user_id: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    user_id,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const { total } = await transactionsRepository.getBalance(user_id);

    if (type === 'outcome' && value > Number(total)) {
      throw new AppError('Your balance is insufficient');
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      user_id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
