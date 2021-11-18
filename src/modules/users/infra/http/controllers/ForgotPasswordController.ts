import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendoForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendoForgotPasswordEmail.execute({
      email,
    });

    return res.status(204).json();
  }
}
