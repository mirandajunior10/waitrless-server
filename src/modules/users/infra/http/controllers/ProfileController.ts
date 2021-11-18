import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '../../../services/UpdateProfileService';

export default class ProfileController {

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { name, email, old_password, password } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      email,
      old_password,
      password,
      name,
    });

    return res.json(classToClass(user));
  }
}
