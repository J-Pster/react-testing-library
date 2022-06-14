import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

import pokemons from '../data';

describe('Testando o PokemonDetails.js', () => {
  const DATA_TEST_IDS = [
    'pokemon-name',
    'pokemon-type',
    'pokemon-weight',
    'pokemon-type-button'];

  test('Testando se as informações detalhadas são corretamente exibidas', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    userEvent.click(moreDetails);

    const name = screen.getByTestId(DATA_TEST_IDS[0]);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(pokemons[0].name);

    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(screen.queryByText(/More details/i)).toBe(null);
    const summaryHeader = screen.getByText(/Summary/i);
    expect(summaryHeader).toBeInTheDocument();
    expect(summaryHeader).toBeInstanceOf(HTMLHeadingElement);
    expect(summaryHeader.tagName).toBe('H2');

    const sumarryText = screen.getByText(pokemons[0].summary);
    expect(sumarryText).toBeInTheDocument();
  });

  test('Testando se existe uma seção com as localizações do pokemon', () => {
    renderWithRouter(<App />);
    const curPoke = pokemons[0];

    const moreDetails = screen.getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${curPoke.id}`);
    userEvent.click(moreDetails);

    const name = screen.getByTestId(DATA_TEST_IDS[0]);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(curPoke.name);

    const summaryHeader = screen.getByText(`Game Locations of ${curPoke.name}`);
    expect(summaryHeader).toBeInTheDocument();
    expect(summaryHeader).toBeInstanceOf(HTMLHeadingElement);
    expect(summaryHeader.tagName).toBe('H2');

    curPoke.foundAt.forEach((loc) => {
      const locationText = screen.getByText(loc.location);
      expect(locationText).toBeInTheDocument();
    });

    const locationImage = screen.getAllByAltText(`${curPoke.name} location`);
    expect(locationImage).toHaveLength(curPoke.foundAt.length);
    locationImage.forEach((img, index) => {
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', curPoke.foundAt[index].map);
    });
  });

  test('Testando se existe uma seção com as localizações do pokemon', () => {
    renderWithRouter(<App />);
    const curPoke = pokemons[0];

    const moreDetails = screen.getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${curPoke.id}`);
    userEvent.click(moreDetails);

    const name = screen.getByTestId(DATA_TEST_IDS[0]);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(curPoke.name);

    const favoriteButton = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('type', 'checkbox');

    userEvent.click(favoriteButton);
    expect(favoriteButton).toBeChecked();
    const favoriteIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(favoriteButton);
    expect(favoriteButton).not.toBeChecked();
    expect(screen.queryByAltText(`${pokemons[0].name} is marked as favorite`)).toBe(null);
  });
});
