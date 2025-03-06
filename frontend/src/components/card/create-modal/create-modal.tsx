import { useState, useEffect } from "react";
import { useFoodDataMutate } from "../../../hooks/useFoodDataMutate";
import { FoodData } from "../interface/foodData";

import "./modal.css";

interface ModalProps {
  closeModal(): void;
}

const Input = ({ label, value, updateValue }: { label: string; value: string | number; updateValue(value: any): void }) => (
  <>
    <label>{label}</label>
    <input value={value} onChange={(event) => updateValue(event.target.value)} />
  </>
);

export function CreateModal({ closeModal }: ModalProps) {
  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState(0);
  const [imagem, setImagem] = useState("");
  const { postMutation, isSuccess, isLoading } = useFoodDataMutate();

  const submit = () => {
    const foodData: FoodData = {
      titulo,
      preco,
      imagem,
    };
    postMutation.mutate(foodData);
  };

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess, closeModal]);

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
        <h2>Cadastre um novo item no cardápio</h2>
        <form className="input-container">
          <Input label="Título" value={titulo} updateValue={setTitulo} />
          <Input label="Preço" value={preco} updateValue={setPreco} />
          <Input label="Imagem" value={imagem} updateValue={setImagem} />
        </form>
        <button onClick={submit} className="btn-secondary">
          {isLoading ? "Postando..." : "Postar"}
        </button>
      </div>
    </div>
  );
}
