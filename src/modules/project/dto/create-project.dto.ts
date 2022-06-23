import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Project should have a name' })
  @Length(3, 255)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Project should have a description' })
  @Length(3, 255)
  description: string;
}
