// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";

// Prepara o ambiente para cada teste
beforeEach(() => {
  render(<App />);
});

test("Testa a renderização do componente Header.", () => {
  // Verifica se o Header está presente
  expect(screen.getByRole("banner")).toBeInTheDocument();
});
