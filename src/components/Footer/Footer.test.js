// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";

// Prepara o ambiente para cada teste
beforeEach(() => {
  render(<App />);
});

// Teste para renderização de Header, NavBar e Footer
test("Testa a renderização do componentes Footer.", () => {
  // Verifica se o Footer está presente
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
