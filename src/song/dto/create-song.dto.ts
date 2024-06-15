import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDto {
  @IsString()
  title: string;

  // @IsString()
  songImage: string;

  // @IsString()
  song: string;

  @IsString()
  album: string;

  @IsString()
  duration: string;
}