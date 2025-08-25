import { Controller, Get, Post, Put, Delete, Body, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { AdminUser } from './admin_users.entity';
import { CreateAdminUserDto } from './dto/create-user.dto';

@Controller('admin-users')
export class AdminUsersController {
    constructor(
        @InjectRepository(AdminUser)
        private readonly adminUserRepo: Repository<AdminUser>,
    ) {}

    // 🔹 Tüm veriler
    @Get()
    getAll() {
        return this.adminUserRepo.find();
    }

    // 🔹 Arama (isim veya email içinde)
    @Get('search')
    search(@Query('q') q: string) {
        return this.adminUserRepo.find({
        where: [
            { name: Like(`%${q}%`) },
            { email: Like(`%${q}%`) }
        ],
        });
    }

    // 🔹 Ekleme
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() dto: CreateAdminUserDto) {
        const newUser = this.adminUserRepo.create(dto);
        return this.adminUserRepo.save(newUser);
    }

    @Post('update/:id')
    async update(
        @Param('id') id: number,
        @Body() dto: Partial<CreateAdminUserDto>,
        ) {
        await this.adminUserRepo.update(id, dto);
        return this.adminUserRepo.findOneBy({ id });
    }

    // 🔹 Silme (GET ile)
    @Get('delete/:id')
    delete(@Param('id') id: number) { return this.adminUserRepo.delete(id); }
}
