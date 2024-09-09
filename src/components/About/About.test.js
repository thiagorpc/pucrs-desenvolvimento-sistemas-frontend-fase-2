import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./../../App";

// Prepara o ambiente para cada teste
beforeEach(() => {
  render(<App />);
});

test("Testa a renderização do componente Sobre Nós.", () => {
  // Encontra o link para a página de lista de carros e clica nele
  fireEvent.click(screen.getByText(/Sobre Nós/i));

  // Verifica se a URL está correta
  expect(window.location.pathname).toBe("/about");
});
