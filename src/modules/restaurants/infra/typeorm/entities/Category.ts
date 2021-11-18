import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Restaurant from './Restaurant';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  restaurant_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}

export default Category;
