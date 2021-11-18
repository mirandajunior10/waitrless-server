
import Client from './Client';


class Table {

  firestore_table_id: string;

  restaurant_id: string;

  number: number;

  clients: Client[];

  openDate: string;
  open: boolean;

  created_at: number;

  updated_at: number;
}

export default Table;
