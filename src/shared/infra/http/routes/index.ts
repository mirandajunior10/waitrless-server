// Arquivo de configuração das rotas gerais, será chamado em server.ts

import { Router } from 'express';

import categoriesRouter from '../../../../modules/restaurants/infra/http/routes/categories.routes';
import menuRouter from '../../../../modules/restaurants/infra/http/routes/menu.routes';
import ordersRouter from '../../../../modules/restaurants/infra/http/routes/orders.routes';
import restaurantsRouter from '../../../../modules/restaurants/infra/http/routes/restaurants.routes';
import tablesRouter from '../../../../modules/restaurants/infra/http/routes/tables.routes';

import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';
import billsRouter from '../../../../modules/restaurants/infra/http/routes/bills.routes';


const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/menu', menuRouter);
routes.use('/orders', ordersRouter);
routes.use('/restaurants', restaurantsRouter);
routes.use('/tables', tablesRouter);
routes.use('/bills', billsRouter);

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);

export default routes;
