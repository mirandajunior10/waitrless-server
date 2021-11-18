import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import { verify } from 'jsonwebtoken';
import AppError from '../../../../../shared/errors/AppError';
import auth from '../../../../../config/auth';
interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return res.json({ user: classToClass(user), token });
  }
  public async index(req: Request, res: Response): Promise<Response> {
    const { token } = req.body;

    try {
      verify(token, auth.jwt.secret);
      return res.json({ verified: true, dateVerified: new Date(Date.now()) });

    } catch {
      return res.json({ verified: false, dateVerified: new Date(Date.now()) });
    }


  }
}
