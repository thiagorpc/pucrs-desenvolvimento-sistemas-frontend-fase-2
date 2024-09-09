import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//
// Importa o Axios
import axios from "axios";
//
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import About from "./components/About";
import CarList from "./components/Car/List";
import CarForm from "./components/Car/Form";

import styles from "./App.module.css"; // Importa o módulo CSS

// Importa a lista de carros
// Deixo de utilizar a lista de carros locais
//import GaragemEstoque from "./Data/GaragemEstoque";

//API para consulta a lista de carros
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/cars";

const App = () => {
  // name da aplicação a partir da variável global
  const appName = process.env.REACT_APP_APP_NAME || "Garagem"; // Valor padrão se a variável não estiver definida

  // Estado para gerenciar a lista de carros
  //const [carList, setCarList] = useState(GaragemEstoque);
  //Novo useState para interação com a API
  const [carList, setCarList] = useState([]);

  // Função para buscar os carros da API
  // Executa apenas uma vez quando inicializa o componente
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setCarList(response.data); // Atualiza o estado com os dados da API
      })
      .catch((error) => {
        console.error("Erro ao buscar carros:", error);
      });
  }, []);

  //Função para atualizar ou criar novo carro
  function handleSaveCar(car) {
    if (car.id) {
      // Atualiza um carro existente (PUT)
      axios
        .put(API_URL, car)
        .then(function (response) {
          setCarList(function (prev) {
            return prev.map(function (c) {
              return c.id === car.id ? response.data : c;
            });
          });
        })
        .catch(function (error) {
          console.error("Erro ao atualizar o carro:", error);
        });
    } else {
      // Adiciona um novo carro
      axios
        .post(API_URL, car)
        .then(function (response) {
          setCarList(function (prev) {
            return [...prev, response.data];
          });
        })
        .catch(function (error) {
          console.error("Erro ao adicionar carro:", error);
        });
    }
  }

  function handleDeleteCar(carId) {
    axios
      .delete(`${API_URL}/${carId}`)
      .then(() => {
        setCarList((prev) => prev.filter((car) => car.id !== carId));
      })
      .catch((error) => {
        console.error("Erro ao deletar o carro:", error);
      });
  }

  return (
    <Router>
      <div className={styles.app}>
        <Header appName={appName} />

        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <Routes>
              <Route
                path="/carlist"
                element={
                  <CarList
                    carList={carList}
                    setCarList={setCarList}
                    onDelete={handleDeleteCar}
                  />
                }
              />
              <Route
                path="/carform"
                element={<CarForm onSave={handleSaveCar} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Content />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
