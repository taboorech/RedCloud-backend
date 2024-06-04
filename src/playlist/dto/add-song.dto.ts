import { IsNumber, IsString } from "class-validator";

export class AddSongDto {
  @IsString()
  title: string;

  @IsString()
  songUrl: string;

  @IsString()
  author: string;

  @IsString()
  album: string;

  @IsNumber()
  duration: number;
}