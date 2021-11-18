
import { firestore } from 'firebase-admin';
import { getDate, getMonth, getYear } from 'date-fns';

import IFirestoreOrdersRepository from '../../../repositories/IFirestoreOrdersRepository';
import ICreateOrderDTO from '../../../dtos/ICreateOrderDTO';
import IUpdateOrderDTO from '../../../dtos/IUpdateOrderDTO';
import Order from '../schemas/Order';
import AppError from '../../../../../shared/errors/AppError';

class FirestoreOrdersRepository implements IFirestoreOrdersRepository {

  public async retrieveOrders(restaurant_id: string): Promise<Order[]> {
    const firestoreRepository = firestore();

    const ordersSnapshot = await firestoreRepository
      .collection('restaurants')
      .doc(restaurant_id)
      .collection('orders').get()

    const orders = [] as Order[]
    ordersSnapshot.forEach(order => {
      let orderData = { ...order.data() as Order, id: order.id }
      orders.push(orderData)
    })
    return orders
  }

  public async createOrder(orderData: ICreateOrderDTO): Promise<Order> {
    const firestoreRepository = firestore();

    const today = new Date();
    const now = Date.now();
    const day = getDate(today);
    const month = getMonth(today) + 1;
    const year = getYear(today);
    const openDate = `${year}/${month}/${day}`;

    const newOrder = firestoreRepository
      .collection('restaurants')
      .doc(orderData.restaurant_id)
      .collection('orders').doc()

    const orderLog = firestoreRepository
      .collection('restaurants')
      .doc(orderData.restaurant_id)
      .collection(`ordersHistory`).doc(openDate).collection('orders').doc(newOrder.id);

    const newOrderData = { ...orderData, created_at: now, updated_at: now, status: 'open' };

    try {
      await orderLog.set(newOrderData)
      await newOrder.set(newOrderData)

      const orderCreated = { ...newOrderData, id: newOrder.id } as Order;
      return orderCreated;
    } catch (error) {
      throw new AppError('Something went wrong when creating order')
    }


  }

  public async updateOrderStatus({ restaurant_id, order_id, status }: IUpdateOrderDTO): Promise<Order> {
    const firestoreRepository = firestore();

    const orderReference = firestoreRepository
      .collection('restaurants')
      .doc(restaurant_id)
      .collection('orders').doc(order_id)

    const newOrder = (await orderReference.get()).data() as Order
    if (!newOrder) {
      throw new AppError('Order not found')
    }

    try {
      newOrder.status = status;
      await orderReference.set(newOrder)
      newOrder.id = orderReference.id
      return newOrder
    } catch (error) {
      throw new AppError('Something went wrong when updating order status')
    }


  }

}

export default FirestoreOrdersRepository;
