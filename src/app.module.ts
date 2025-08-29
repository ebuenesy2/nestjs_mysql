import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //! Mysql Bilgileri
import { UsersController } from './users/users.controller'; //! User Controller
import { Users } from './users/user.entity'; //! Entity Oluşturuldu

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'test',
      entities: [Users ],
      synchronize: false,    // Geliştirme için, DB tablolarını otomatik oluşturma Kapalı
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {} 