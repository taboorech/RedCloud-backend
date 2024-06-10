import { IsEnum, IsJSON, IsOptional, IsString } from 'class-validator';
import { UserCountry } from '../user-country.enum';

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
  @IsEnum(UserCountry)
  country: UserCountry;

  @IsOptional()
  backgroundImage: string;

  @IsOptional()
  @IsJSON()
  settings: string;
}