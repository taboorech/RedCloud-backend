import { IsString } from "class-validator";

export class AddOwnerDto {
  @IsString()
  owner: string;
}