
import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import OrdersController from '../controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
import { OrderStatusEnum } from '../../../../../@types';

const ordersRouter = Router();
const ordersController = new OrdersController();
ordersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      observations: Joi.string(),
      name: Joi.string().required(),
      itemId: Joi.string().required(),
      restaurant_id: Joi.string().uuid().required(),
      table_id: Joi.string().required(),
      document_orderer: Joi.string().required(),
      number: Joi.number().required(),
      quantity: Joi.number().required(),

    },
  }),
  ordersController.create)
ordersRouter.get('/', ensureAuthenticated, ordersController.show)
ordersRouter.patch('/',
  celebrate({
    [Segments.BODY]: {
      order_id: Joi.string().required(),
      status: Joi.string().required().equal(OrderStatusEnum),
    },
  }), ensureAuthenticated, ordersController.update);

export default ordersRouter