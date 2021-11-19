import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateRestaurantMenuItemService from '../../../services/CreateRestaurantMenuItemService';
import DeleteRestaurantMenuItemService from '../../../services/DeleteRestaurantMenuItemService';
import UpdateRestaurantMenuItemService from '../../../services/UpdateRestaurantMenuItemService';
import MenuItemsRepository from '../../typeorm/repositories/MenuItemsRepository'

export default class RestaurantMenuController {
  private createRestaurantMenuItem: CreateRestaurantMenuItemService;
  private updateRestaurantMenuItem: UpdateRestaurantMenuItemService;
  private deleteRestaurantMenuItem: DeleteRestaurantMenuItemService;

  public async create(req: Request, res: Response): Promise<Response> {
    const { category_id, description, name, value } = req.body;
    let quantity = req.body.quantity || 0;
    let isHighlight = Boolean(req.body.isHighlight) ?? false;
    const { id: user_id } = req.user;
    const pictureFilename = req.file ? req.file.filename : undefined
    this.createRestaurantMenuItem = container.resolve(CreateRestaurantMenuItemService)

    const restaurantMenuItem = await this.createRestaurantMenuItem.execute({ name, user_id, category_id, description, quantity, value, pictureFilename, isHighlight });

    return res.json(classToClass(restaurantMenuItem))


  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, description, category_id, quantity, value, isHighlight } = req.body;
    const { id: user_id } = req.user;


    this.updateRestaurantMenuItem = container.resolve(UpdateRestaurantMenuItemService)

    const restaurantMenuItem = await this.updateRestaurantMenuItem.execute({ id, name, user_id, category_id, description, quantity, value, isHighlight });

    return res.json(classToClass(restaurantMenuItem))


  }

  public async show(req: Request, res: Response): Promise<Response> {

    const { restaurant_id } = req.params;

    const menuItemsRepository = new MenuItemsRepository()

    const restaurantMenu = await menuItemsRepository.findByRestaurant(restaurant_id)

    return res.json(classToClass(restaurantMenu))


  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: user_id } = req.user;

    this.deleteRestaurantMenuItem = container.resolve(DeleteRestaurantMenuItemService)

    const restaurantMenuItem = await this.deleteRestaurantMenuItem.execute({ id, user_id });

    return res.json(classToClass(restaurantMenuItem))


  }
}