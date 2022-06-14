import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o NotFound.js', () => {
  test('Testando a Página de Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');

    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
    const imgOnNotFound = screen.getAllByRole('img');
    expect(imgOnNotFound[1]).toBeInTheDocument();
    expect(imgOnNotFound[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
