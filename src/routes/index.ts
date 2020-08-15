import { Router } from 'express';

// import transactionRouter from './transaction.routes';
import usersRouter from './users.routes';
import sessionRouter from './sessions.routes';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
// routes.use('/transactions', transactionRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;
