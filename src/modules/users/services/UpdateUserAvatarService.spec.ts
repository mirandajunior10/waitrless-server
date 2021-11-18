import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '../../../shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update a user avatar', async () => {
    const user = await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(response.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non authenticated user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be delete avatar when there is already a existing one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    const response = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(response.avatar).toBe('avatar2.jpg');
  });
});
