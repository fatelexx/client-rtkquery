import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatDto } from './cat-dto';

@Controller('cats')
export class AppController {
  private cats: Array<CatDto> = [
    {
      id: 1,
      firstName: 'diablo',
      lastName: 'job',
      birthday: new Date('1/2/2023')
    }
  ]

  @Get()
  getData() {
    return this.cats;
  }

  @Post()
  create(@Body() createCatDto: CatDto) {
    const id = Math.max(...this.cats.map(x => x.id)) + 1;
    this.cats.push({ ...createCatDto, id })
    return id;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(id);
    const cat = this.cats.find(x => x.id === +id);
    console.log(cat);
    // if(!cat) {
    //   return; 
    // }
    return cat;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: CatDto) {
    const cat = this.cats.find(x => x.id === +id);
    // if(!cat) {
    //   return;      
    // }

    cat.firstName = updateUserDto.firstName;
    cat.lastName = updateUserDto.lastName;
    cat.birthday = updateUserDto.birthday;

    return;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const cat = this.cats.find(x => x.id === +id);
    // if(!cat) {
    //   return;      
    // }

    this.cats.splice(this.cats.indexOf(cat), 1);
    return;
  }
}
