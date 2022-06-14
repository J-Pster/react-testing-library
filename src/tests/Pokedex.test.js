import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

import pokemons from '../data';

const pokeTyp = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

describe('Testando o Pokedex.js', () => {
  const DATA_TEST_IDS = [
    'pokemon-name',
    'pokemon-type',
    'pokemon-weight',
    'pokemon-type-button'];

  test('Testando se existe o H2', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  test('Testando se o Próximo Pokemon é Mostrado ao clicar no botão', () => {
    renderWithRouter(<App />);
    const botaoDeProximo = screen.getByText(/Próximo pokémon/i);
    expect(botaoDeProximo).toBeInTheDocument();

    expect(screen.getByTestId(DATA_TEST_IDS[0])).toBeInTheDocument();
    expect(screen.getByTestId(DATA_TEST_IDS[0])).toHaveTextContent(/Pikachu/i);
    userEvent.click(botaoDeProximo);
    expect(screen.getByTestId(DATA_TEST_IDS[0])).toBeInTheDocument();
    expect(screen.getByTestId(DATA_TEST_IDS[0])).toHaveTextContent(/Charmander/i);

    userEvent.click(botaoDeProximo);
    userEvent.click(botaoDeProximo);
    userEvent.click(botaoDeProximo);
    userEvent.click(botaoDeProximo);
    userEvent.click(botaoDeProximo);
    userEvent.click(botaoDeProximo);
    userEvent.click(botaoDeProximo);
    userEvent.click(botaoDeProximo);
    expect(screen.getByTestId(DATA_TEST_IDS[0])).toBeInTheDocument();
    expect(screen.getByTestId(DATA_TEST_IDS[0])).toHaveTextContent(/Pikachu/i);
  });

  test('Testando se apenas um pokemon é mostrado por vez', () => {
    renderWithRouter(<App />);
    const botaoDeProximo = screen.getByText(/Próximo pokémon/i);
    expect(botaoDeProximo).toBeInTheDocument();

    expect(screen.getByTestId(DATA_TEST_IDS[0])).toBeInTheDocument();
    expect(screen.getByTestId(DATA_TEST_IDS[0])).toHaveTextContent(/Pikachu/i);
    userEvent.click(botaoDeProximo);
    expect(screen.getByTestId(DATA_TEST_IDS[0])).toBeInTheDocument();
    expect(screen.getByTestId(DATA_TEST_IDS[0])).toHaveTextContent(/Charmander/i);
    expect(screen.getByTestId(DATA_TEST_IDS[0])).not.toHaveTextContent(/Pikachu/i);

    const Pokemons = screen.getAllByTestId(DATA_TEST_IDS[0]);
    expect(Pokemons).toHaveLength(1);
  });

  test('Testando se existe um botão de filtro para cada tipo', () => {
    renderWithRouter(<App />);
    const botoes = screen.getAllByTestId(DATA_TEST_IDS[3]);
    expect(botoes).toHaveLength(pokeTyp.length);

    const botaoAll = screen.getByRole('button', { name: /All/i });
    expect(botaoAll).toBeInTheDocument();

    botoes.forEach((botao, index) => {
      expect(botao).toBeInTheDocument();
      expect(botao).toHaveTextContent(pokeTyp[index]);
    });
  });

  test('Testando se o filtro de tipo funciona', () => {
    renderWithRouter(<App />);
    const botoes = screen.getAllByTestId(DATA_TEST_IDS[3]);
    expect(botoes).toHaveLength(pokeTyp.length);
    userEvent.click(botoes[0]);

    const botaoDeProximo = screen.getByText(/Próximo pokémon/i);
    expect(botaoDeProximo).toBeInTheDocument();
    expect(botaoDeProximo).toHaveAttribute('disabled');

    userEvent.click(botoes[1]);
    expect(botaoDeProximo).not.toHaveAttribute('disabled');
    expect(screen.getByTestId(DATA_TEST_IDS[1])).toBeInTheDocument();
    expect(screen.getByTestId(DATA_TEST_IDS[1])).toHaveTextContent(/Fire/i);
    userEvent.click(botaoDeProximo);
    expect(screen.getByTestId(DATA_TEST_IDS[1])).toBeInTheDocument();
    expect(screen.getByTestId(DATA_TEST_IDS[1])).toHaveTextContent(/Fire/i);
  });

  test('Testando se o botao de resetar filtro funciona', () => {
    renderWithRouter(<App />);
    const botoes = screen.getAllByTestId(DATA_TEST_IDS[3]);
    expect(botoes).toHaveLength(pokeTyp.length);

    const botaoAll = screen.getByRole('button', { name: /All/i });
    expect(botaoAll).toBeInTheDocument();
    userEvent.click(botaoAll);

    const botaoDeProximo = screen.getByText(/Próximo pokémon/i);
    expect(botaoDeProximo).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(screen.getByTestId(DATA_TEST_IDS[0])).toBeInTheDocument();
      expect(screen.getByTestId(DATA_TEST_IDS[0])).toHaveTextContent(pokemon.name);
      userEvent.click(botaoDeProximo);
    });
  });
});
