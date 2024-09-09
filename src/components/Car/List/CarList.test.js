import axios from "axios";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../../../App";
//import CarList from "./components/Car/List";

// Mock do Axios
jest.mock("axios");

beforeEach(() => {
  // Limpar o mock antes de cada teste
  jest.clearAllMocks();
});

test("Valida a renderização da lista de carros a partir da API.", async () => {
  // Definindo a resposta simulada do Axios
  const mockCars = [
    { id: 1, name: "Mustang", brand: "Ford", color: "Preto", year: "1970" },
    { id: 2, name: "Camaro", brand: "GM", color: "Amarelo", year: "2010" },
    {
      id: 4,
      name: "Mazda-CX50",
      brand: "Mazda",
      color: "Cinza",
      year: "1998",
    },
  ];

  // Mock do Axios para retornar a resposta simulada
  axios.get.mockResolvedValueOnce({ data: mockCars });

  // Renderiza o App com o Router
  render(<App />);

  // Encontra o link para a página de lista de carros e clica nele
  fireEvent.click(screen.getByText(/Sobre Nós/i));

  // Verifica se a URL está correta
  expect(window.location.pathname).toBe("/about");

  //Encontra o botão para adicionar um novo carro e clica nele
  fireEvent.click(screen.getByText(/Lista de Carros/i));

  //Verifica se a URL está correta
  expect(window.location.pathname).toBe("/carlist");

  // Esperar que os carros sejam renderizados
  await waitFor(() => {
    expect(screen.getByText("Mustang")).toBeInTheDocument();
    expect(screen.getByText("Camaro")).toBeInTheDocument();
    expect(screen.getByText("Mazda-CX50")).toBeInTheDocument();
  });
});
