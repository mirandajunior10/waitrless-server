import AppError from '../../../shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users wihe the same email from another', async () => {
    await createUser.execute({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        restaurant_id: '123',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
