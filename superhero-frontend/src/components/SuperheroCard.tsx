import { Superhero } from "../types/superhero";

interface SuperheroCardProps {
  hero: Superhero;
}

const SuperheroCard: React.FC<SuperheroCardProps> = ({ hero }) => {
  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-lg font-bold">{hero.name}</h3>
      <p>
        <strong>Super Power:</strong> {hero.superpower}
      </p>
      <p>
        <strong>Humility Score:</strong> {hero.humilityScore}
      </p>
    </div>
  );
};

export default SuperheroCard;
