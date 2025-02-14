import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSuperhero } from "../api/superheroApi";
import { Superhero } from "../types/superhero";

const Header: React.FC = () => {
  const [form, setForm] = useState<Superhero>({
    name: "",
    superpower: "",
    humilityScore: 0,
  });
  const queryClient = useQueryClient();

  const mutation = useMutation<Superhero, Error, Superhero>({
    mutationFn: addSuperhero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superheroes"] }); // ✅ Correct query invalidation
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "humilityScore" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.superpower.trim() ||
      form.humilityScore <= 0 ||
      form.humilityScore > 10
    ) {
      alert("All fields are required. Humility score must be greater than 0.");
      return;
    }

    mutation.mutate(form, {
      onSuccess: () => {
        setForm({ name: "", superpower: "", humilityScore: 0 }); // ✅ Reset form only on success
      },
    });
  };

  return (
    <header className="p-6 bg-purple-600 text-white text-center">
      <h1 className="text-2xl font-bold">Superhero Registry</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 justify-center">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className={`p-2 border rounded-md ${
            !form.name ? "border-yellow-500" : "border-gray-300"
          }`}
        />
        <input
          type="text"
          name="superpower"
          placeholder="Power"
          value={form.superpower}
          onChange={handleChange}
          className={`p-2 border rounded-md ${
            !form.superpower ? "border-yellow-500" : "border-gray-300"
          }`}
        />
        <input
          type="number"
          name="humilityScore"
          placeholder="Humility Score"
          value={form.humilityScore}
          onChange={handleChange}
          className={`p-2 border rounded-md ${
            form.humilityScore <= 0 ? "border-yellow-500" : "border-gray-300"
          }`}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white"
          disabled={mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Adding..." : "Add"}
        </button>
      </form>
    </header>
  );
};

export default Header;
