import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; // dotenv paketini içe aktar

dotenv.config(); // .env dosyasındaki değişkenleri yükler

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api'); //! Başlangıç Api Ekleme Yapıyor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
