import DayOpened from './DayOpened';

class Order {
  id: string;

  name: string;

  cnpj: string;

  daysOpened: {
    [year: string]:{
      [month: string]:{
        [day: string]: DayOpened[];
      }
    }
  };

  created_at: Date;

  updated_at: Date;
}

export default Order;
