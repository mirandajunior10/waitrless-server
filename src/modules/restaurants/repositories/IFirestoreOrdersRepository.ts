import ICreateOrderDTO from "../dtos/ICreateOrderDTO";
import IUpdateOrderDTO from "../dtos/IUpdateOrderDTO";
import Order from "../infra/typeorm/schemas/Order";

export default interface IFirestoreOrdersRepository {
  retrieveOrders(restaurant_id: string): Promise<Order[]>
  createOrder(orderData: ICreateOrderDTO): Promise<Order>
  updateOrderStatus(orderData: IUpdateOrderDTO): Promise<Order>

}