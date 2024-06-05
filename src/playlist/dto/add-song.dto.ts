import { IsString } from "class-validator";

export class AddSongDto {
  @IsString()
  songId: string;
}