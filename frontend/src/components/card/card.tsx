import "./card.css";

interface CardProps {
  preco: number;
  titulo: string;
  imagem: string;
  onClick: () => void;
}

export function Card({ preco, imagem, titulo, onClick }: CardProps) {
  return (
    <div className="card" onClick={onClick}>
      <img src={imagem} alt={titulo} />
      <h2>{titulo}</h2>
      <p>
        <b>Valor:</b> {preco}
      </p>
    </div>
  );
}
