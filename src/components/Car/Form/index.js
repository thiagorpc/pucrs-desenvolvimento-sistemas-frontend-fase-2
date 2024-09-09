import React, { useState, useEffect } from "react";

import styles from "./CarForm.module.css"; // Importa o módulo CSS
import ConfirmActionModal from "../../ConfirmActionModal";
import { useLocation, useNavigate } from "react-router-dom";

function CarForm({ onSave }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const carData = location.state?.car || {};
  const [car, setCar] = useState({
    id: carData.id || null,
    name: carData.name || "",
    brand: carData.brand || "",
    color: carData.color || "",
    year: carData.year || "",
  });
  const [errors, setErrors] = useState({});

  function containsInvalidChars(value) {
    // Verifica se a string contém caracteres < ou >
    return /[<>]/.test(value);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    // Verifica caracteres inválidos
    if (containsInvalidChars(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Caracteres < e > não são permitidos.",
      }));
      return;
    }

    setCar((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  }

  function validateField(name, value) {
    switch (name) {
      case "name":
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, name: "Nome é obrigatório." }));
        } else if (value.length < 5) {
          setErrors((prev) => ({
            ...prev,
            name: "Nome deve conter ao menos 5 letras.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, name: "" }));
        }
        break;
      case "brand":
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, brand: "Marca é obrigatória." }));
        } else {
          setErrors((prev) => ({ ...prev, brand: "" }));
        }
        break;
      case "year":
        if (
          !value ||
          isNaN(value) ||
          value < 1850 ||
          value > new Date().getFullYear()
        ) {
          setErrors((prev) => ({
            ...prev,
            year:
              "Ano de fabricação inválido. Deve ser maior que 1850 e menor ou igual a " +
              new Date().getFullYear() +
              ".",
          }));
        } else {
          setErrors((prev) => ({ ...prev, year: "" }));
        }
        break;
      case "color":
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, color: "Cor é obrigatória." }));
        } else {
          setErrors((prev) => ({ ...prev, color: "" }));
        }
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formIsValid = Object.values(errors).every((error) => !error);
    if (formIsValid) {
      setIsModalOpen(true);
    }
  }

  function confirmAction() {
    onSave(car); // Chama a função onSave passada como props
    cancelAction();
  }

  function cancelAction() {
    navigate("/carlist"); // Navega para a lista de carros
    setIsModalOpen(false); // Garante que o modal esteja fechado
  }

  useEffect(() => {
    document.title = car.id ? "Editar Carro" : "Adicionar Carro";
  }, [car.id]);

  return (
    <div className={styles.baseContainer}>
      <div className={styles.carFormContainer}>
        <h1>{car.id ? "Editar Carro" : "Adicionar Carro"}</h1>
        <form onSubmit={handleSubmit} className={styles.carForm}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={car.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </label>
          <label>
            Marca:
            <input
              type="text"
              name="brand"
              value={car.brand}
              onChange={handleChange}
              required
            />
            {errors.brand && <div className={styles.error}>{errors.brand}</div>}
          </label>
          <label>
            Cor:
            <input
              type="text"
              name="color"
              value={car.color}
              onChange={handleChange}
              required
            />
            {errors.color && <div className={styles.error}>{errors.color}</div>}
          </label>
          <label>
            Ano de Fabricação:
            <input
              type="number"
              name="year"
              value={car.year}
              onChange={handleChange}
              required
            />
            {errors.year && <div className={styles.error}>{errors.year}</div>}
          </label>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={Object.values(errors).some((error) => error)}
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={cancelAction}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </form>
      </div>
      <ConfirmActionModal
        isOpen={isModalOpen}
        onClose={cancelAction}
        onConfirm={confirmAction}
        titulo={car.id ? "Confirmar Edição" : "Confirmar Inclusão"}
        mensagem={
          car.id
            ? "Tem certeza de que deseja editar este carro?"
            : "Tem certeza de que deseja adicionar um novo carro?"
        }
      />
    </div>
  );
}

export default CarForm;
