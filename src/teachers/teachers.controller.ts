import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeacherEntity } from './entities/teacher.entity';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { Public } from 'src/common/decorators';

@Public()
@Controller('teachers')
@ApiTags('teachers')
@UseFilters(PrismaClientExceptionFilter)
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiCreatedResponse({ type: TeacherEntity })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiOkResponse({ type: TeacherEntity, isArray: true })
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TeacherEntity })
  async findOne(@Param('id') id: string) {
    const teacher = await this.teachersService.findOne(id);
    if (!teacher) {
      throw new NotFoundException(`Could not find teacher with id: ${id}.`);
    }
    return teacher;
  }

  @Patch(':id')
  @ApiOkResponse({ type: TeacherEntity })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TeacherEntity })
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
