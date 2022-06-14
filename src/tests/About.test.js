import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o About.js', () => {
  test('Testando os Cabeçalhos', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('About'));

    const aboutPokedex = screen.getByText(/About Pokédex/i);
    expect(aboutPokedex).toBeInTheDocument();

    const h2InThePage = screen.getByRole('heading', { level: 2 });
    expect(h2InThePage).toBeInTheDocument();
    expect(h2InThePage).toHaveTextContent('About Pokédex');
  });

  test('Testando os Paragrafos', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('About'));

    const firstPInThePage = screen.getByText(/This application simulates a Pokédex/i);
    expect(firstPInThePage).toBeInTheDocument();
    const secondPInThePage = screen.getByText(/One can filter Pokémons by type/i);
    expect(secondPInThePage).toBeInTheDocument();
  });

  test('Testando as Imagens', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('About'));

    const imageInThePage = screen.getByRole('img');
    expect(imageInThePage).toBeInTheDocument();
    expect(imageInThePage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
