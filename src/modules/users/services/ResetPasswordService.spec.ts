import AppError from '../../../shared/errors/AppError'
import User from '../infra/typeorm/entities/User';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    let user: User | undefined
     user = await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      token,
      password: '123123',
    });

    user = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(user?.password).toBe('123123');
  });

  it('should not be able to reset the password with an non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: '06514',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password of an non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if more than 2 hours have passed', async () => {
    const user = await fakeUsersRepository.create({
      restaurant_id: '123',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
