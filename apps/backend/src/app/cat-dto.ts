import { ApiProperty } from "@nestjs/swagger";
import { CatDto as Dto } from "@client-rtkquery/dto";

export class CatDto implements Dto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    firstName: string;
  
    @ApiProperty()
    lastName: string;
  
    @ApiProperty()
    birthDay: Date;
  }
  