import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin_users') // tablo adı burada
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  password: string;
}
