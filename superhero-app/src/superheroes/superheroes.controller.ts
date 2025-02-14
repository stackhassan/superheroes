import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { Superhero } from './superhero.entity';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createSuperhero(@Body() body: { name: string; superpower: string; humilityScore: number }): Superhero {
    return this.superheroesService.createSuperhero(body.name, body.superpower, body.humilityScore);
  }

  @Get()
  getAllSuperheroes(): Superhero[] {
    return this.superheroesService.getSuperheroesSortedByHumility();
  }
}
