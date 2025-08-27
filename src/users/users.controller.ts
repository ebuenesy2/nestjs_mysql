import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Users } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true })) // Bütün endpoint'ler için doğrulama
export class UsersController {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  // 1️⃣ Tüm verileri getir (GET /users)
  @Get()
  async getAllUsers() {

    const dbFind = await this.userRepository.find({
       order: { id: 'DESC' }, // ID'ye göre sırala
    });

    return {
      title:"Tüm Veriler",
      DB:dbFind,
      size:dbFind.length,
      id:dbFind[0]?.id
    }

  }

  // Arama (GET /users/find/:id)
  @Get('find/:id')
  async getUserById(@Param('id') id: number) {
    const dbFind = await this.userRepository.findOne({ where: { id: id } });

    // Check if a user was found
    if (!dbFind) {
      return {
        title: "Veri Arama",
        error: "Kullanıcı bulunamadı.",
      };
    }

    return {
      title: "Veri Arama",
      data: dbFind,
      name:dbFind?.name
    };
  }

  // Arama (GET /users/search?keyword=...)
  @Get('search')
  async searchUsers(@Query('keyword') keyword: string) {

    const dbFind = await this.userRepository.find({ // Use 'await' to get the data
      where: [
        { name: Like(`%${keyword}%`) },
        { surname: Like(`%${keyword}%`) },
      ],
    });

    return {
      title:"Veri Arama",
      DB:dbFind,
      size:dbFind.length,
      id:dbFind[0]?.id
    }
  }

  // Yeni kullanıcı oluştur (POST /users/add)
  @Post('add')
  createUser(@Body() dto: CreateUserDto) {
    const newUser = this.userRepository.create(dto);
    return this.userRepository.save(newUser);
  }

  // Kullanıcıyı ID ile güncelle (POST /users/edit/:id)
  @Post('edit/:id')
  async edit(@Param('id') id: number, @Body() dto: Partial<CreateUserDto>) {

    // 1. Veritabanından mevcut kullanıcıyı bul
    const userToUpdate = await this.userRepository.findOne({ where: { id: id } });

    // 2. Eğer kullanıcı bulunamazsa hata dön
    if (!userToUpdate) {
      return { message: "Kullanıcı bulunamadı." };
    }

    // 3. Güncelleme tarihini manuel olarak DTO'ya ekleme
    const updatePayload = {
      ...dto,
      isUpdated: true, // Bu kolonu Entity'nize eklemeniz gerekir
      
    };

    const updatedUser = this.userRepository.merge(userToUpdate, updatePayload);

    // 4. Güncellenmiş veriyi veritabanına kaydet ve sonucu dön
    const savedUser = await this.userRepository.save(updatedUser);

    return {
      message: "Kullanıcı başarıyla güncellendi.",
      data: savedUser, // Değiştirilen kısım burası
    };
  }

  // Kullanıcıyı ID ile sil (DELETE /users/delete/:id)
  @Get('delete/:id')
  async deleteUser(@Param('id') id: number) {
    const deleteResult = await this.userRepository.delete(id);
    var status = 1;

    // Etkilenen satır sayısını kontrol et
    if (deleteResult.affected === 0) { status = 0; }
    
    return {
      message: status == 1 ? `ID'si ${id} olan kullanıcı başarıyla silindi.` : `ID'si ${id} olan kullanıcı bulunamadı.`,
      status: status == 1 ? 'success' : 'error'
    };
  }

}