import AppError from '../../../shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateUserProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
    });

    expect(updatedUser.restaurant_id).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'teste@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile of a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing user',
        name: 'John Trê',
        email: 'johntre@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        old_password: 'wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
