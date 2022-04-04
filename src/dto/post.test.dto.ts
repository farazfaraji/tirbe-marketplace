import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Data {
    @IsString()
      challenge: string
}

export class PostTestDto {
    @IsString()
      networkId: string;

    @IsString()
      context: string;

    @IsArray()
      currentSettings: string[];

    @IsString()
      type: string;

    @ValidateNested({ each: true })
    @Type(() => Data)
      data: Data
}
