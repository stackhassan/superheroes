import { IsInt, Min, Max } from 'class-validator';

export class Superhero {
  id: number;
  name: string;
  superpower: string;

  @IsInt()
  @Min(1, { message: 'humilityScore must be at least 1' })
  @Max(10, { message: 'humilityScore cannot be greater than 10' })
  humilityScore: number;
  
  constructor(id: number, name: string, superpower: string, humilityScore: number) {
    this.id = id;
    this.name = name;
    this.superpower = superpower;
    this.humilityScore = humilityScore;
  }
}
  