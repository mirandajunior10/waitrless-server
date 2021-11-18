import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import RestaurantsController from '../controllers/RestaurantsController';

const restaurantsRouter = Router();

const restaurantsController = new RestaurantsController();

restaurantsRouter.get('/', restaurantsController.show);

restaurantsRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  restaurantsController.index);

restaurantsRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      document: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  restaurantsController.create);

export default restaurantsRouter