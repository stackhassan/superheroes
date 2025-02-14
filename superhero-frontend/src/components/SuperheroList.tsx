import { useQuery } from "@tanstack/react-query";
import { fetchSuperheroes } from "../api/superheroApi";
import { Superhero } from "../types/superhero";
import SuperheroCard from "./SuperheroCard";

const SuperheroList: React.FC = () => {
  const {
    data: superheroes = [],
    isLoading,
    isError,
    error,
  } = useQuery<Superhero[]>({
    queryKey: ["superheroes"],
    queryFn: fetchSuperheroes,
  });

  if (isLoading)
    return <p className="text-center text-gray-600">Loading superheroes...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error: {error?.message}</p>;

  return (
    <section className="bg-purple-100 p-6">
      <h2 className="text-xl font-bold text-center">Superhero List</h2>
      {superheroes.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {superheroes.map((hero) => (
            <SuperheroCard hero={hero} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No superheroes found.</p>
      )}
    </section>
  );
};

export default SuperheroList;
