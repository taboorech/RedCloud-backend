import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdatePlaylistDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  isPrivate: string;
}