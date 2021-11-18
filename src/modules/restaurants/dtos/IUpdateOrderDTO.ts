export default interface ICreateOrderDTO {
  order_id: string;
  restaurant_id: string;
  status: 'open' | 'accepted' | 'ready' | 'closed';
}