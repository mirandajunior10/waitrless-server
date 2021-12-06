
import { Router } from 'express';
import BillsController from '../controllers/BillsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const billsRouter = Router();

const billsController = new BillsController();

billsRouter.put('/close', ensureAuthenticated, billsController.update)
export default billsRouter