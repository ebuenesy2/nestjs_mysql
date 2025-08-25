import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //! Mysql Bilgileri
import { AdminUsersController } from './admin_users/admin_users.controller'; //! User Controller
import { AdminUser  } from './admin_users/admin_users.entity'; //! Entity Oluşturuldu

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // MySQL şifren
      database: 'areonx_dev_mysql',  // Bağlanmak istediğin DB
      entities: [AdminUser ],
      synchronize: true,    // Geliştirme için, DB tablolarını otomatik oluşturur
    }),
    TypeOrmModule.forFeature([AdminUser]),
  ],
  controllers: [AdminUsersController],
  providers: [],
})
export class AppModule {} 