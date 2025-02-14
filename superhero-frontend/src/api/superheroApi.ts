import axios from 'axios';
import { Superhero } from '../types/superhero';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/superheroes',
    headers: { 'Content-Type': 'application/json' }
});

export const fetchSuperheroes = async (): Promise<Superhero[]> => {
    const response = await apiClient.get('/');
    return response.data;
};

export const addSuperhero = async (hero: Superhero): Promise<Superhero> => {
    const response = await apiClient.post('/', hero);
    return response.data;
};
