import { SuperheroesService } from './superheroes.service';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(() => {
    service = new SuperheroesService();
  });

  describe('createSuperhero', () => {
    it('should create and return a new superhero', () => {
      const hero = service.createSuperhero('Iron Man', 'Genius', 7);

      expect(hero).toBeDefined();
      expect(hero.id).toBe(1);
      expect(hero.name).toBe('Iron Man');
      expect(hero.superpower).toBe('Genius');
      expect(hero.humilityScore).toBe(7);
    });

    it('should assign unique IDs to each superhero', () => {
      const hero1 = service.createSuperhero('Iron Man', 'Genius', 7);
      const hero2 = service.createSuperhero('Thor', 'Thunder', 8);

      expect(hero1.id).toBe(1);
      expect(hero2.id).toBe(2);
    });
  });

  describe('getSuperheroesSortedByHumility', () => {
    it('should return superheroes sorted by humilityScore', () => {
      service.createSuperhero('Iron Man', 'Genius', 7);
      service.createSuperhero('Thor', 'Thunder', 10);
      service.createSuperhero('Loki', 'Illusions', 4);

      const sortedHeroes = service.getSuperheroesSortedByHumility();

      expect(sortedHeroes[0].name).toBe('Loki');
      expect(sortedHeroes[1].name).toBe('Iron Man');
      expect(sortedHeroes[2].name).toBe('Thor');
    });

    it('should return an empty array if no superheroes exist', () => {
      expect(service.getSuperheroesSortedByHumility()).toEqual([]);
    });

    it('should return a single superhero if only one exists', () => {
      const hero = service.createSuperhero('Spider-Man', 'Web-slinging', 9);
      const sortedHeroes = service.getSuperheroesSortedByHumility();

      expect(sortedHeroes.length).toBe(1);
      expect(sortedHeroes[0]).toEqual(hero);
    });
  });
});
