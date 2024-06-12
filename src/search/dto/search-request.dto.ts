import { IsString } from "class-validator";

export class SearchRequestDto {
  @IsString()
  request: string;
}