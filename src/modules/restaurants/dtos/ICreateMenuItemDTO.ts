export default interface ICreateMenuItemDTO{
  restaurant_id: string;
  category_id: string;
  name: string;
  description: string;
  quantity: number;
  value: number;
  picture: string | undefined;
}