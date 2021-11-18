
import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import TablesController from '../controllers/TablesController';
import TablesSessionController from '../controllers/TablesSessionController';
import TableClientsController from '../controllers/TableClientsController';

const tablesRouter = Router();

const tablesController = new TablesController();
const tablesSessionController = new TablesSessionController();
const tableClientsController = new TableClientsController();

tablesRouter.get('/:restaurant_id/', tablesController.show)
tablesRouter.get('/:restaurant_id/:number', tablesController.index)
tablesRouter.delete('/:number', ensureAuthenticated, tablesController.delete)
tablesRouter.post('/', ensureAuthenticated, tablesController.create)

tablesRouter.post('/:restaurant_id/:number/register', tablesSessionController.create)
tablesRouter.post('/clients/rename', tableClientsController.update)

export default tablesRouter