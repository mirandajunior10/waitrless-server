
import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import TablesController from '../controllers/TablesController';
import TablesSessionController from '../controllers/TablesSessionController';
import TableClientsController from '../controllers/TableClientsController';
import FirestoreTablesController from '../controllers/FirestoreTablesController';

const tablesRouter = Router();

const tablesController = new TablesController();
const firestoreTablesController = new FirestoreTablesController();
const tablesSessionController = new TablesSessionController();
const tableClientsController = new TableClientsController();

tablesRouter.get('/open', ensureAuthenticated, firestoreTablesController.show)
tablesRouter.get('/:restaurant_id/', tablesController.show)
tablesRouter.get('/:restaurant_id/:number', tablesController.index)
tablesRouter.delete('/:number', ensureAuthenticated, tablesController.delete)
tablesRouter.patch('/:number', ensureAuthenticated, tablesController.update)

tablesRouter.post('/', ensureAuthenticated, tablesController.create)
tablesRouter.post('/:restaurant_id/:number/register', tablesSessionController.create)
tablesRouter.post('/clients/rename', tableClientsController.update)

export default tablesRouter