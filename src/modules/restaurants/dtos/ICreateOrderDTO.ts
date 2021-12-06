export default interface ICreateOrderDTO {
  restaurant_id: string;
  table_id: string;
  document_orderer: string;
  name?: string;
  itemId: string;
  quantity: number;
  observations: string;
  value: number;
}