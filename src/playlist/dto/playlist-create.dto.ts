import { IsString } from "class-validator";

export class PlaylistCreateDto {
  @IsString()
  title: string;
}