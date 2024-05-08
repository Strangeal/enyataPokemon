import { useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import AboutContent from "./AboutContent";
import StatsContent from "./StatsContent";
import SimilarContent from "./SimilarContent";
import useClickOutside from "./hooks/UseClickOutside";
type ModalProps = {
  pokemon: any;
  setIsModal: (value: boolean) => void;
  similarPokes: any;
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

const Modal = ({ pokemon, setIsModal, similarPokes }: ModalProps) => {
  const [activeTab, setActiveTab] = useState("about");
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsModal(false));

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed bg-gray-500 w-full h-screen px-10 left-0 bottom-0 z-50 bg-opacity-60">
      <div
        ref={containerRef}
        className="rounded-s-3xl p-3 w-[30rem] max-w-[90%] h-screen mx-auto bg-white absolute right-0 bottom-0 overflow-y-auto"
      >
        <div className="w-full bg-slate-400 border rounded-2xl h-60 mb-24">
          <button
            onClick={() => setIsModal(false)}
            className="absolute top-7 left-6 bg-white border px-3 py-2.5 rounded"
            type="button"
          >
            <FaArrowLeftLong />
          </button>
          <img
            className="mx-auto relative top-20 w-1/2"
            src={pokemon.sprites?.other.dream_world.front_default}
            alt={pokemon.name}
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 mb-10">
          <h4 className="font-bold text-4xl text-black">{pokemon.name}</h4>
          <ul className="flex items-center justify-center gap-x-3">
            {pokemon?.types?.map((type: any, index: number) => (
              <li
                key={index}
                className="flex items-center gap-1 bg-gray-300 w-fit rounded-full px-2"
              >
                <p className="text-sm font-light">
                  {getTypeEmoji(type.type.name)}
                </p>
                <p className="text-sm font-light">{type.type.name}</p>
              </li>
            ))}
          </ul>
        </div>

        {activeTab === "about" && (
          <AboutContent
            height={pokemon.height}
            weight={pokemon.weight}
            abilities={pokemon.abilities}
          />
        )}
        {activeTab === "stats" && <StatsContent stats={pokemon.stats} />}
        {activeTab === "similar" && (
          <SimilarContent similarPokes={similarPokes} />
        )}

        <div className="fixed bg-white p-3 shadow-2xl border border-gray-100 w-[30rem] right-0 bottom-0">
          <div className="w-[70%] mx-auto bg-gray-300 rounded-full">
            <ul className="text-sm flex items-center gap-5 p-1 font-medium text-center text-gray-500 rounded-lg">
              <li className="w-full focus-within:z-10">
                <button
                  type="button"
                  onClick={() => {
                    handleActiveTab("about");
                    console.log(activeTab);
                  }}
                  className={`inline-block w-full font-light py-2 px-4 text-gray-900 rounded-full active focus:outline-none ${
                    activeTab === "about" ? "bg-white" : ""
                  }`}
                >
                  About
                </button>
              </li>
              <li className="w-full focus-within:z-10">
                <button
                  type="button"
                  onClick={() => {
                    handleActiveTab("stats");
                    console.log(activeTab);
                  }}
                  className={`inline-block w-full font-light py-2 px-4 text-gray-900 rounded-full active focus:outline-none ${
                    activeTab === "stats" ? "bg-white" : ""
                  }`}
                >
                  Stats
                </button>
              </li>
              <li className="w-full focus-within:z-10">
                <button
                  type="button"
                  onClick={() => {
                    handleActiveTab("similar");
                    console.log(activeTab);
                  }}
                  className={`inline-block w-full font-light py-2 px-4 text-gray-900 rounded-full active focus:outline-none ${
                    activeTab === "similar" ? "bg-white" : ""
                  }`}
                >
                  Similar
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
