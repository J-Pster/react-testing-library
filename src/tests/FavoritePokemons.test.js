import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o FavouritePokemons.js', () => {
  test('Verifica mensagem correta quando não há pokemons favoritados', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite/i));

    expect(screen.getByText('Favorite pokémons')).toBeInTheDocument();
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('Verifica se todos os pokemons favoritados são mostrados', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/i));
    userEvent.click(screen.getByText(/Pokémon favoritado?/i));
    userEvent.click(screen.getByText(/Favorite/i));

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
