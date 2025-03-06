import { useState } from "react";
import "./App.css";
import { Card } from "./components/card/card";
import { useFoodData } from "./hooks/useFoodData";
import { CreateModal } from "./components/card/create-modal/create-modal";
import { UpdateDeleteModal } from "./components/card/create-modal/updateDeleteModal";

function App() {
  const { data } = useFoodData();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isUpdateDeleteModalOpen, setIsUpdateDeleteModalOpen] = useState(false);
  const [selectedFoodData, setSelectedFoodData] = useState(null);

  const handleOpenPostModal = () => {
    setIsPostModalOpen(true);
  };

  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };

  const handleOpenUpdateDeleteModal = (foodData) => {
    setSelectedFoodData(foodData);
    setIsUpdateDeleteModalOpen(true);
  };

  const handleCloseUpdateDeleteModal = () => {
    setIsUpdateDeleteModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map((foodData) => (
          <Card
            key={foodData.id}
            preco={foodData.preco}
            titulo={foodData.titulo}
            imagem={foodData.imagem}
            onClick={() => handleOpenUpdateDeleteModal(foodData)}
          />
        ))}
      </div>

      {isPostModalOpen && <CreateModal closeModal={handleClosePostModal} />}
      {isUpdateDeleteModalOpen && selectedFoodData && (
        <UpdateDeleteModal
          foodData={selectedFoodData}
          closeModal={handleCloseUpdateDeleteModal}
        />
      )}

      <button onClick={handleOpenPostModal}>Novo</button>
    </div>
  );
}

export default App;
