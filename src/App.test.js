// src/App.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Prepara o ambiente para cada teste
beforeEach(() => {
  render(<App />);
});

// Teste para renderização de Header, NavBar e Footer
test("Testa a renderização da página princial.", () => {
  // Verifica se o Header está presente
  expect(screen.getByRole("banner")).toBeInTheDocument();

  // Verifica se o NavBar está presente
  expect(screen.getByRole("navigation")).toBeInTheDocument();

  // Verifica se o Footer está presente
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});

test("Valida a navegação até o link 'Sobre Nós'.", () => {
  // Encontra o link para a página de lista de carros e clica nele
  fireEvent.click(screen.getByText(/Sobre Nós/i));

  // Verifica se a URL está correta
  expect(window.location.pathname).toBe("/about");
});

test("Valida a navegação até o link 'Lista de Carros'.", () => {
  //Encontra o botão para adicionar um novo carro e clica nele
  fireEvent.click(screen.getByText(/Lista de Carros/i));

  //Verifica se a URL está correta
  expect(window.location.pathname).toBe("/carlist");
});

test("Valida a navegação até o link 'Adicionar Carro'.", () => {
  //Encontra o botão para adicionar um novo carro e clica nele
  fireEvent.click(screen.getByText(/Adicionar Novo Carro/i));

  //Verifica se a URL está correta
  expect(window.location.pathname).toBe("/carform");
});

test("Valida a navegação ao retornar para a página 'Lista de Carros'.", () => {
  //Encontra o botão para adicionar um novo carro e clica nele
  fireEvent.click(screen.getByText(/Cancelar/i));

  //Verifica se a URL está correta
  expect(window.location.pathname).toBe("/carlist");
});
