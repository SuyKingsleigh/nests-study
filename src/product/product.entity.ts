import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from './product_image.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    nullable: false,
    length: 500,
  })
  name: string;

  @Column({
    name: 'description',
    nullable: false,
    length: 500,
  })
  description: string;

  @Column({
    name: 'user_id',
    nullable: false,
    length: 255,
  })
  userId: string;

  @Column({
    name: 'price',
    nullable: false,
  })
  price: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: string;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: string;
  
  
  // productImages: ProductImage[];
}
