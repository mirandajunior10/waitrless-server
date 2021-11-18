import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '../../../../../config/upload';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Restaurant from '../../../../restaurants/infra/typeorm/entities/Restaurant';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'restaurant_id'})
  restaurant_id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose()
  @OneToOne(() => Restaurant)
  @JoinColumn({name: 'restaurant_id'})
  restaurant: Restaurant;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
