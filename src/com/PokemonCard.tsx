import React from "react";

type PokemonCardProps = {
  name: string;
  data: any;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCardClick: (id: number) => void;
  handleSimilarType: (type: string) => void;
  modeColor: string;
};

const getTypeEmoji = (typeName: string) => {
  switch (typeName) {
    case "fire":
      return "🔥";
    case "water":
      return "💧";
    case "grass":
      return "🌿";
    case "normal":
      return "🐻";
    case "electric":
      return "⚡️";
    case "flying":
      return "🦋";
    case "poison":
      return "☠️";
    case "ground":
      return "⛰️";
    case "fighting":
      return "🥷";
    default:
      return "";
  }
};

const PokemonCard = ({
  name,
  data,
  setIsModal,
  handleCardClick,
  handleSimilarType,
  modeColor,
}: PokemonCardProps) => {
  const types = data.types.map((type: any) => type.type.name);

  // console.log(buttonClass);

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-3 h-full border">
      <div className="bg-prime_gray rounded-2xl h-36 border flex justify-center">
        <img
          className="size-44 relative -top-16"
          src={`${data.sprites?.other["official-artwork"].front_default}`}
          alt={name}
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-1 py-5">
        <h4 className="text-xl text-center font-medium">{name}</h4>
        <ul className="flex items-center justify-center gap-x-3">
          {data?.types?.map((type: any, index: number) => (
            <li
              key={index}
              className="flex items-center gap-1 bg-gray-300 w-fit rounded-full px-2"
            >
              <span className="block">{getTypeEmoji(type.type.name)}</span>
              <p>{type.type.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => {
          handleCardClick(data.id);
          setIsModal(true);
          handleSimilarType(types);
        }}
        className={`bg-${modeColor} text-white w-full rounded-2xl p-3 font-medium`}
        type="button"
      >
        View Pokemon
      </button>
    </div>
  );
};

export default PokemonCard;
