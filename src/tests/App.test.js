import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o App.js', () => {
  test('Verificando se os links tem os nomes corretos', () => {
    renderWithRouter(<App />);
    const Links = screen.getAllByRole('link');
    expect(Links[0]).toHaveTextContent('Home');
    expect(Links[1]).toHaveTextContent('About');
    expect(Links[2]).toHaveTextContent('Favorite Pokémons');
  });

  test('Verificando se o redirecionamento dos links está correto', () => {
    const { history } = renderWithRouter(<App />);
    let { pathname } = history.location;
    const Links = screen.getAllByRole('link');

    userEvent.click(Links[0]);
    expect(pathname).toBe('/');

    history.push('/');
    userEvent.click(Links[1]);
    pathname = history.location.pathname;
    expect(pathname).toBe('/about');

    history.push('/');
    userEvent.click(Links[2]);
    pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');

    history.push('/pagina-que-nao-existe');
    const mensagemNaoExiste = screen.getByText(/Page requested not found/i);
    expect(mensagemNaoExiste).toBeInTheDocument();
  });
});
