import { useState, useEffect } from "react";
import { useFoodDataMutate } from "../../../hooks/useFoodDataMutate";
import { FoodData } from "../interface/foodData";

import "./modal.css";

interface ModalProps {
  closeModal(): void;
  foodData: FoodData;
}

export function UpdateDeleteModal({ closeModal, foodData }: ModalProps) {
  const [titulo, setTitulo] = useState(foodData.titulo);
  const [preco, setPreco] = useState(foodData.preco);
  const [imagem, setImagem] = useState(foodData.imagem);
  const { updateMutation, deleteMutation, isLoading } = useFoodDataMutate();

  const update = () => {
    const updatedFoodData: FoodData = {
      ...foodData,
      titulo,
      preco,
      imagem,
    };
    updateMutation.mutate(updatedFoodData);
  };

  const deleteItem = () => {
    deleteMutation.mutate(foodData.id);
  };

  useEffect(() => {
    if (updateMutation.isSuccess || deleteMutation.isSuccess) {
      closeModal();
    }
  }, [updateMutation.isSuccess, deleteMutation.isSuccess, closeModal]);

  // Fechar o modal ao clicar fora dele
  const handleClickOutside = (e: React.MouseEvent) => {
    const modal = e.target as HTMLElement;
    if (modal.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-body">
        <h2>Editar ou Excluir Item</h2>
        <form className="input-container">
          <label>Título</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <label>Preço</label>
          <input value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
          <label>Imagem</label>
          <input value={imagem} onChange={(e) => setImagem(e.target.value)} />
        </form>
        <button onClick={update} className="btn-secondary">
          {isLoading ? "Atualizando..." : "Atualizar"}
        </button>
        <button onClick={deleteItem} className="btn-danger">
          Excluir
        </button>
      </div>
    </div>
  );
}
