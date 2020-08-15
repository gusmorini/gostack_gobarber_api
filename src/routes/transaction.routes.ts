import { Router } from 'express';
import { getCustomRepository, TransactionRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const transactionRouter = Router();

// middleware
transactionRouter.use(ensureAuthenticated);

transactionRouter.get('/', async (request, response) => {
  try {
    const { id } = request.user;
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transactions = await transactionsRepository.find({
      where: { user_id: id },
    });
    const balance = await transactionsRepository.getBalance(id);
    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', async (request, response) => {
  const { id } = request.user;

  const { title, value, type } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    user_id: id,
  });
  return response.json(transaction);
});

export default transactionRouter;
