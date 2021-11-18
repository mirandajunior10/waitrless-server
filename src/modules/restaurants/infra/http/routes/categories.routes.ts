import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.get('/:restaurant_id/', categoriesController.show)

categoriesRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  ensureAuthenticated, categoriesController.create)

categoriesRouter.delete('/:id',
  ensureAuthenticated, categoriesController.delete)

export default categoriesRouter