import { OrderStatusEnum } from "../../../../../@types";

class Order {

  id: string;

  itemId: string;

  restaurant_id: string;

  document_orderer: string;

  table_id: string;

  status: OrderStatusEnum;

  quantity: number;

  observations: string;

  created_at: number;

  updated_at: number;
}

export default Order;
