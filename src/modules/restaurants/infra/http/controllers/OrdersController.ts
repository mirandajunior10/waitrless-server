import { Request, response, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../../../services/CreateOrderService';
import RetrieveOrdersService from '../../../services/RetrieveOrdersService';
import UpdateOrderStatusService from '../../../services/UpdateOrderService';


export default class OrdersController {
  private createOrder: CreateOrderService;
  private retrieveOrder: RetrieveOrdersService;
  private updateOrderStatus: UpdateOrderStatusService;

  public async create(req: Request, res: Response): Promise<Response> {
    const { observations = '', name, itemId, restaurant_id, table_id, document_orderer, tableNumber, quantity, value } = req.body
    this.createOrder = container.resolve(CreateOrderService)

    const order = await this.createOrder.execute({ observations, name, itemId, restaurant_id, table_id, document_orderer, tableNumber, quantity, value })

    return res.json(order);

  }
  public async show(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    this.retrieveOrder = container.resolve(RetrieveOrdersService)

    const orders = await this.retrieveOrder.execute({ user_id })

    return res.json(orders);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { status, order_id } = req.body;
    const { id: user_id } = req.user;
    this.updateOrderStatus = container.resolve(UpdateOrderStatusService)

    const orders = await this.updateOrderStatus.execute({ user_id, order_id, status })

    return res.json(orders);
  }
}