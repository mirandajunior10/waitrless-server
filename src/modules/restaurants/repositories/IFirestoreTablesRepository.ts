import IRegisterClientDTO from "../dtos/IRegisterClientOnTableDTO";
import IRenameClientDTO from "../dtos/IRenameClientDTO";

export default interface IFirestoreTablesRepository {
  registerClientOnTable(tableClient: IRegisterClientDTO): Promise<any>
  renameClient(tableClientData: IRenameClientDTO): Promise<any>

}