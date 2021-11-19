import { OrderStatusEnum } from "../../../@types";

export default interface ICreateOrderDTO {
  order_id: string;
  restaurant_id: string;
  status: OrderStatusEnum;
}