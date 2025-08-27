import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({message:'isim boş olamaz'})
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  @IsNotEmpty({message:'email boş olamaz'})
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  password: string;
}

