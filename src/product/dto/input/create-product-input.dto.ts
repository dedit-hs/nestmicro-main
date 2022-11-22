import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductInput {
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsString()
  readonly likes: number;
}
