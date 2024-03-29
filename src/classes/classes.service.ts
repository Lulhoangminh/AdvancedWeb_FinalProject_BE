import { Injectable } from '@nestjs/common';
import CreateClassDto from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassesService {
  findOneByCode(code: string) {
    return this.prisma.class.findUnique({
      where: {
        invite_code: code,
      },
    });
  }
  constructor(private prisma: PrismaService) {}

  create(createClassDto: CreateClassDto) {
    return this.prisma.class.create({
      data: createClassDto,
    });
  }

  findAll() {
    return this.prisma.class.findMany({
      where: {},
    });
  }

  findOne(id: string) {
    return this.prisma.class.findUnique({
      where: {
        class_id: id,
      },
    });
  }

  update(id: string, updateClassDto: UpdateClassDto) {
    return this.prisma.class.update({
      where: {
        class_id: id,
      },
      data: updateClassDto,
    });
  }

  remove(id: string) {
    return this.prisma.class.delete({
      where: {
        class_id: id,
      },
    });
  }

  async getClassesByUserId(userId: string) {
    return this.prisma.classMember.findMany({
      where: {
        student_id: userId,
      },
      include: {
        class: true,
      },
    });
  }
}
