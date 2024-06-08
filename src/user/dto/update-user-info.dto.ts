import { IsOptional, IsString } from 'class-validator';

export class UpdateUserInfoDto {
  @IsString()
  @IsOptional()
  login: string;

  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  settings: Object;
}