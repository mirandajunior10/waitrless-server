import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../../../../../config/upload';
import RestaurantMenuController from '../controllers/RestaurantMenuController';

const upload = multer(uploadConfig.multer);
const menuRouter = Router();

const restaurantMenuController = new RestaurantMenuController();

menuRouter.get('/:restaurant_id/',
  celebrate({
    [Segments.PARAMS]: {
      restaurant_id: Joi.string().required(),
    },
  }),
  restaurantMenuController.show);

menuRouter.post('/',
  ensureAuthenticated,
  upload.single('picture'),
  celebrate({
    [Segments.BODY]: {
      category_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      quantity: Joi.number(),
      value: Joi.number().required(),
      isHighlight: Joi.boolean().required(),
    },
  }),
  restaurantMenuController.create);

menuRouter.put('/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      quantity: Joi.number(),
      value: Joi.number().required(),
      isHighlight: Joi.boolean().required(),
    },
  }),
  ensureAuthenticated, restaurantMenuController.update)

menuRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated, restaurantMenuController.delete);


export default menuRouter