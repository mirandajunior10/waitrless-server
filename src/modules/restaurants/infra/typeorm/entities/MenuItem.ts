import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Category from './Category';
import Restaurant from './Restaurant';
import uploadConfig from '../../../../../config/upload';
import { Exclude, Expose } from 'class-transformer';

@Entity('restaurantMenuItems')
class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  restaurant_id: string;

  @Column()
  category_id: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  quantity: number;

  @Column()
  name: string;

  @Column()
  isHighlight: boolean;

  @Exclude()
  @Column()
  picture: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Expose({ name: 'picture_url' })
  getPictureUrl(): string | null {
    if (!this.picture) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.picture}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.picture}`;
      default:
        return null;
    }
  }

}

export default MenuItem;
