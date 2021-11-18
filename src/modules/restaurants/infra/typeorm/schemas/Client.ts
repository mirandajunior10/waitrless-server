
import Order from './Order';

class Client {
  cpf: string;

  name?: string
  
  orders: Order[];

  created_at: number;

  updated_at: number;
}

export default Client;
