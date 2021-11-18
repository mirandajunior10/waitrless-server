import { container } from 'tsyringe';

import '../../modules/users/providers';
import './providers';


import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '../../modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '../../modules/users/infra/typeorm/repositories/UserTokensRepository';

import IMenuItemsRepository from '../../modules/restaurants/repositories/IMenuItemsRepository';
import MenuItemsRepository from '../../modules/restaurants/infra/typeorm/repositories/MenuItemsRepository';

import IRestaurantsRepository from '../../modules/restaurants/repositories/IRestaurantsRepository';
import RestaurantsRepository from '../../modules/restaurants/infra/typeorm/repositories/RestaurantsRepository';

import TablesRepository from '../../modules/restaurants/infra/typeorm/repositories/TablesRepository';
import ITablesRepository from '../../modules/restaurants/repositories/ITablesRepository';

import IFirestoreTablesRepository from '../../modules/restaurants/repositories/IFirestoreTablesRepository';
import FirestoreTablesRepository from '../../modules/restaurants/infra/typeorm/repositories/FirestoreTablesRepository';

import ICategoriesRepository from '../../modules/restaurants/repositories/ICategoriesRepository';
import CategoriesRepository from '../../modules/restaurants/infra/typeorm/repositories/CategoriesRepository';
import IFirestoreOrdersRepository from '../../modules/restaurants/repositories/IFirestoreOrdersRepository';
import FirestoreOrdersRepository from '../../modules/restaurants/infra/typeorm/repositories/FirestoreOrdersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IMenuItemsRepository>(
  'MenuItemsRepository',
  MenuItemsRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IRestaurantsRepository>(
  'RestaurantsRepository',
  RestaurantsRepository,
);

container.registerSingleton<ITablesRepository>(
  'TablesRepository',
  TablesRepository,
);

container.registerSingleton<IFirestoreTablesRepository>(
  'FirestoreTablesRepository',
  FirestoreTablesRepository,
);

container.registerSingleton<IFirestoreOrdersRepository>(
  'FirestoreOrdersRepository',
  FirestoreOrdersRepository,
);

