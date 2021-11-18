
import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import OrdersController from '../controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post('/', ordersController.create)
ordersRouter.get('/', ensureAuthenticated, ordersController.show)
ordersRouter.patch('/update/:order_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().required(),
    },
    [Segments.BODY]: {
      status: Joi.string().required().equal("open", "accepted", "ready", "closed"),
    },
  }), ensureAuthenticated, ordersController.update);

export default ordersRouter