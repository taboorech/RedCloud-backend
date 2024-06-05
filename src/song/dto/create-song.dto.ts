import { IsNumber, IsString } from "class-validator";

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  songUrl: string;

  @IsString()
  album: string;

  @IsNumber()
  duration: number;
}