import { Injectable } from '@nestjs/common';
import { Superhero } from './superhero.entity';

@Injectable()
export class SuperheroesService {
  private heroes: Superhero[] = [];
  private idCounter = 1;

  createSuperhero(name: string, superpower: string, humilityScore: number): Superhero {
    const newHero = new Superhero(this.idCounter++, name, superpower, humilityScore);
    this.heroes.push(newHero);
    return newHero;
  }

  getSuperheroesSortedByHumility(): Superhero[] {
    return this.heroes.sort((a, b) => a.humilityScore - b.humilityScore);
  }
}
