import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { restaurant_id, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ email, password, restaurant_id });

    return res.json(classToClass(user));
  }
}
