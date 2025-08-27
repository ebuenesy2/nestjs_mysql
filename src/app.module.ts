import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //! Mysql Bilgileri
import { UsersController } from './users/users.controller'; //! User Controller
import { Users } from './users/user.entity'; //! Entity Oluşturuldu

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // MySQL şifren
      database: 'test',  // Bağlanmak istediğin DB
      entities: [Users ],
      synchronize: false,    // Geliştirme için, DB tablolarını otomatik oluşturma K
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {} 