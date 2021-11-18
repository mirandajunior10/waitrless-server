import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IRestaurantsRepository from '../../restaurants/repositories/IRestaurantsRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('This email is already in use');
    }
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const restaurant = await this.restaurantsRepository.findById(user.restaurant_id)

    if (!restaurant) {
      throw new AppError('restaurant not found', 401);
    }
    restaurant.name = name;
    user.email = email;

    if (password) {
      if (!old_password) {
        throw new AppError(
          'You need to inform the old password to set a new password.',
        );
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.restaurant = restaurant;
    await this.restaurantsRepository.save(restaurant);
    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
