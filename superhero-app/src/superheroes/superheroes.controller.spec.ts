import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { Superhero } from './superhero.entity';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: {
            createSuperhero: jest.fn(),
            getSuperheroesSortedByHumility: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  describe('POST /superheroes', () => {
    it('should create a superhero with a valid humilityScore', () => {
      const newHero: Superhero = { id: 1, name: 'Iron Man', superpower: 'Genius', humilityScore: 7 };
      jest.spyOn(service, 'createSuperhero').mockReturnValue(newHero);

      const result = controller.createSuperhero({
        name: 'Iron Man',
        superpower: 'Genius',
        humilityScore: 7,
      });

      expect(result).toEqual(newHero);
      expect(service.createSuperhero).toHaveBeenCalledWith('Iron Man', 'Genius', 7);
    });

    it('should throw an error if humilityScore is less than 1', () => {
      jest.spyOn(service, 'createSuperhero').mockImplementation(() => {
        throw new Error('Humility score must be in the range between 1 and 10.');
      });

      expect(() =>
        controller.createSuperhero({
          name: 'Thor',
          superpower: 'Thunder',
          humilityScore: 0,
        }),
      ).toThrow('Humility score must be in the range between 1 and 10.');
    });

    it('should throw an error if humilityScore is greater than 10', () => {
      jest.spyOn(service, 'createSuperhero').mockImplementation(() => {
        throw new Error('Humility score must be in the range between 1 and 10.');
      });

      expect(() =>
        controller.createSuperhero({
          name: 'Loki',
          superpower: 'Illusions',
          humilityScore: 11,
        }),
      ).toThrow('Humility score must be in the range between 1 and 10.');
    });
  });

  describe('GET /superheroes', () => {
    it('should return superheroes sorted by humilityScore', () => {
      const superheroes: Superhero[] = [
        { id: 1, name: 'Captain America', superpower: 'Super Soldier', humilityScore: 10 },
        { id: 2, name: 'Iron Man', superpower: 'Genius', humilityScore: 7 },
        { id: 3, name: 'Loki', superpower: 'Illusions', humilityScore: 4 },
      ];

      jest.spyOn(service, 'getSuperheroesSortedByHumility').mockReturnValue(superheroes);

      const result = controller.getAllSuperheroes();
      expect(result).toEqual(superheroes);
      expect(service.getSuperheroesSortedByHumility).toHaveBeenCalled();
    });
  });
});
