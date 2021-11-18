import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Table from './Table';

@Entity('restaurants')
class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Table, table => table.restaurant,{
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'restaurant_id' })
  tables: Table[];
}

export default Restaurant;
