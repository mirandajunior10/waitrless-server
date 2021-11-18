import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Restaurant from './Restaurant';

@Entity('tables')
class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  restaurant_id: string;

  @Column()
  number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Restaurant, restaurant => restaurant.tables, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}

export default Table;
