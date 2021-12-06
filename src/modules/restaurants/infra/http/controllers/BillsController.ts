import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CloseBillService from '../../../services/CloseBillService';


export default class BillsController {
  private closeBill: CloseBillService;

  public async update(req: Request, res: Response): Promise<Response> {

    const { cpf, firestore_table_id } = req.body;

    const { id: user_id } = req.user

    this.closeBill = container.resolve(CloseBillService)


    await this.closeBill.execute({ user_id, cpf, firestore_table_id })

    return res.json({ cpf, updated: "OK" })
  }

}