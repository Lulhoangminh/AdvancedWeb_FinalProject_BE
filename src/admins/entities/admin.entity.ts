import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '@prisma/client';

export class AdminEntity implements Admin {
  @ApiProperty()
  admin_id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  user_id: string;
}
