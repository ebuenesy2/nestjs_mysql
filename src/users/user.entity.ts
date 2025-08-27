// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // Boş olamaz
  name: string;

  @Column({ nullable: false }) // Boş olamaz
  surname: string;

  @Column({ unique: true, nullable: false }) // Boş olabilir
  email: string;
  
  @Column({ nullable: true }) // Boş olabilir
  password: string;

  //! Güncelleme
  @Column({ default: false }) // Varsayılan değer 'false'
  isUpdated: boolean;

  // Otomatik olarak oluşturulma zamanını ekler
  @CreateDateColumn()
  created_at: Date;

  // Otomatik olarak her güncellemede zaman damgasını günceller
  @UpdateDateColumn()
  updated_at: Date;

}