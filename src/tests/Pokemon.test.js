import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

import pokemons from '../data';

describe('Testando o Pokemon.js', () => {
  const DATA_TEST_IDS = [
    'pokemon-name',
    'pokemon-type',
    'pokemon-weight',
    'pokemon-type-button'];

  test('Testando se o card correto é renderizado', () => {
    renderWithRouter(<App />);
    const botaoDeProximo = screen.getByText(/Próximo pokémon/i);
    expect(botaoDeProximo).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const name = screen.getByTestId(DATA_TEST_IDS[0]);
      expect(name).toBeInTheDocument();
      expect(name).toHaveTextContent(pokemon.name);

      const type = screen.getByTestId(DATA_TEST_IDS[1]);
      expect(type).toBeInTheDocument();
      expect(type).toHaveTextContent(pokemon.type);

      const weight = screen.getByTestId(DATA_TEST_IDS[2]);
      const { averageWeight } = pokemon;
      expect(weight).toBeInTheDocument();
      expect(weight).toHaveTextContent(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );

      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', pokemon.image);
      expect(image).toHaveAttribute('alt', `${pokemon.name} sprite`);

      userEvent.click(botaoDeProximo);
    });
  });

  test('Testando se o link do card está correto', () => {
    renderWithRouter(<App />);
    const botaoDeProximo = screen.getByText(/Próximo pokémon/i);
    expect(botaoDeProximo).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const name = screen.getByTestId(DATA_TEST_IDS[0]);
      expect(name).toBeInTheDocument();
      expect(name).toHaveTextContent(pokemon.name);

      const moreDetails = screen.getByText(/More details/i);
      expect(moreDetails).toBeInTheDocument();
      expect(moreDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
      userEvent.click(botaoDeProximo);
    });
  });

  test('Testando se clicar no link de detalhes funciona', () => {
    const { history } = renderWithRouter(<App />);

    const name = screen.getByTestId(DATA_TEST_IDS[0]);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(pokemons[0].name);

    const moreDetails = screen.getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
  });

  test('Testando se favoritar um pokemon funciona', () => {
    const { history } = renderWithRouter(<App />);
    const Links = screen.getAllByRole('link');
    expect(Links[0]).toHaveTextContent('Home');

    const moreDetails = screen.getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);

    const favoriteButton = screen.getByText(/Pokémon favoritado?/i);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    userEvent.click(Links[0]);
    const name = screen.getByTestId(DATA_TEST_IDS[0]);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(pokemons[0].name);
    const favoriteIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
