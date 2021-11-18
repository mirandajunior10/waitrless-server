import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCategoryService from '../../../services/CreateCategoryService';
import DeleteCategoryService from '../../../services/DeleteCategoryService';
import CategoriesRepository from '../../typeorm/repositories/CategoriesRepository';

export default class CategoriesController {
  private createMenuCategory: CreateCategoryService;
  private deleteMenuCategory: DeleteCategoryService;

  public async create(req: Request, res: Response): Promise<Response> {
    const {  description } = req.body;
    const { id: user_id } = req.user

    this.createMenuCategory = container.resolve(CreateCategoryService)

    const restaurantMenuCategory = await this.createMenuCategory.execute({ user_id, description })

    return res.json(restaurantMenuCategory)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: user_id } = req.user

    this.deleteMenuCategory = container.resolve(DeleteCategoryService)

    const restaurantMenuCategory = await this.deleteMenuCategory.execute({ user_id, id })

    return res.json(restaurantMenuCategory)
  }

  public async show(req: Request, res: Response): Promise<Response> {

    const { restaurant_id } = req.params;

    const menuItemsRepository = new CategoriesRepository()

    const restaurantMenu = await menuItemsRepository.findByRestaurant(restaurant_id)

    return res.json(restaurantMenu)


  }

}