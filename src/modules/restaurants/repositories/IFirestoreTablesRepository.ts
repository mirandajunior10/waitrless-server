import ICloseBillDTO from "../dtos/ICloseBillDTO";
import IRegisterClientDTO from "../dtos/IRegisterClientOnTableDTO";
import IRenameClientDTO from "../dtos/IRenameClientDTO";
import Table from "../infra/typeorm/schemas/Table";

export default interface IFirestoreTablesRepository {
  registerClientOnTable(tableClient: IRegisterClientDTO): Promise<any>
  renameClient(tableClientData: IRenameClientDTO): Promise<any>
  fetchOpenTables(restaurant_id: string): Promise<Table[]>
  closeBill(billData: ICloseBillDTO): Promise<void>

}