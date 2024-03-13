import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatDto } from './cat-dto';
import { PrismaService } from '../prisma.service';

@Controller('cats')
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getData() {
    const cats: Array<CatDto> = await this.prisma.cat.findMany();
    return cats;
  }

  @Post()
  async create(@Body() createCatDto: CatDto) {
    const cat = await this.prisma.cat.create({
      data: {
        firstName: createCatDto.firstName,
        birthDay: createCatDto.birthDay,
        lastName: createCatDto.lastName,
      },
    })
    return cat.id;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const cat = await this.prisma.cat.findUniqueOrThrow({where: {id: +id}});
    return cat;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() {firstName, lastName, birthDay}: CatDto) {
    const updateUser = await this.prisma.cat.update({
      where: {
        id: +id,
      },
      data: {
        firstName,
        lastName,
        birthDay
      },
    });
    console.log(updateUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleteCats = await this.prisma.cat.deleteMany({
      where: {
        id: +id
      },
    });

    console.log(deleteCats);
    return;
  }
}
