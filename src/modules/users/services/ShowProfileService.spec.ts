import AppError from '../../../shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const findUser = await showProfile.execute({
      user_id: user.id,
    });

    expect(findUser.id).toBe(user.id);
    expect(findUser.restaurant_id).toBe(user.restaurant_id);
    expect(findUser.email).toBe(user.email);
  });

  it('should not be able to show the profile of a non-existent user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
