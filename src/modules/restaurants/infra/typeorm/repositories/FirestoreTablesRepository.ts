
import { firestore } from 'firebase-admin';
import { getDate, getMonth, getYear } from 'date-fns';

import IFirestoreTablesRepository from '../../../repositories/IFirestoreTablesRepository';

import IRegisterClientDTO from '../../../dtos/IRegisterClientOnTableDTO';
import Table from '../schemas/Table';
import AppError from '../../../../../shared/errors/AppError';
import Client from '../schemas/Client';
import IRenameClientDTO from '../../../dtos/IRenameClientDTO';

class FirestoreTablesRepository implements IFirestoreTablesRepository {

  public async registerClientOnTable({ cpf, number, restaurant_id }: IRegisterClientDTO): Promise<any> {

    const firestoreRepository = firestore();

    const today = new Date();
    const now = Date.now();
    const day = getDate(today);
    const month = getMonth(today) + 1;
    const year = getYear(today);
    const openDate = `${year}/${month}/${day}`;

    //checa se a mesa já está aberta
    const openTables = await firestoreRepository
      .collection('restaurants')
      .doc(restaurant_id)
      .collection('activeTables')
      .where('number', '==', number)
      .limit(1)
      .get()

    if (!openTables.empty) {

      const openTable = openTables.docs[0].data() as Table;

      if (!openTable) {
        throw new AppError("Table does not exist or is not open.", 404)
      }
      openTable.firestore_table_id = openTables.docs[0].ref.id
      let client = openTable.clients.find(client => (client.cpf === cpf))

      if (client) {

        //For the safety of the other clients, their data is removed.
        openTable.clients = [];

        return { table: openTable, user: client }
      } else {
        client = {
          cpf,
          created_at: now,
          updated_at: now,
          orders: []
        }
        if (!openTable.clients) {
          openTable.clients = []
        }
        openTable.clients.push(client);

        await openTables.docs[0].ref.set(openTable);

        //For the safety of the other clients, their data is removed.
        openTable.clients = [];

        return { table: openTable, user: client }
      }


    } else {
      //Abre a mesa, caso não esteja aberta
      let client: Client = {
        cpf,
        created_at: now,
        updated_at: now,
        orders: []
      }

      let table: Table = {
        firestore_table_id: "",
        restaurant_id,
        number,
        clients: [client],
        openDate,
        open: true,
        created_at: now,
        updated_at: now

      }

      const dayOpen = firestoreRepository
        .collection('restaurants')
        .doc(restaurant_id)
        .collection('daysOpened')
        .doc(openDate);
      const newTable = dayOpen.collection('tables').doc()

      table.firestore_table_id = newTable.id;
      await newTable.set(table)
      await firestoreRepository
        .collection('restaurants')
        .doc(restaurant_id)
        .collection('activeTables')
        .doc(newTable.id)
        .set(table)
      table.clients = [];

      return { table, user: client }

    }

  }

  public async renameClient({ name, restaurant_id, firestore_table_id, cpf }: IRenameClientDTO): Promise<any> {

    const firestoreRepository = firestore();

    const table = await firestoreRepository
      .collection('restaurants')
      .doc(restaurant_id)
      .collection('activeTables')
      .doc(firestore_table_id).get()

    const tableData: Table | undefined = table.data() as Table
    console.log(tableData)

    if (!tableData) {
      throw new AppError('Something went wrong', 400)
    }

    let clientIndex = tableData.clients.findIndex(client => (client.cpf === cpf))

    let client = tableData.clients[clientIndex]

    client.name = name
    tableData.clients[clientIndex] = client

    await table.ref.set(tableData)
    firestoreRepository
      .collection('restaurants')
      .doc(restaurant_id)
      .collection('daysOpened')
      .doc(tableData.openDate)
      .collection('tables')
      .doc(table.ref.id)
      .set(tableData)

    return client

  }
}

export default FirestoreTablesRepository;
