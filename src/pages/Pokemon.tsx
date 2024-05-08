import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import PokemonCard from "../components/PokemonCard";
import {
  getAllpokemons,
  getPokemonDetails,
} from "../redux/pokemon/pokemonSlice";
import Pagination from "../components/Pagination";
import Nav from "../components/Nav";
import Modal from "../components/Modal";

const Pokemon = () => {
  const [isModal, setIsModal] = useState(false);
  const [isTheme, setIsTheme] = useState(
    () => localStorage.getItem("theme") || "theme-blue"
  );
  const [inputSearch, setInputSearch] = useState("");
  const [limit, setLimit] = useState(8);
  const [modeColor, setModeColor] = useState("primeBlue");

  useEffect(() => {
    if (isTheme === "theme-blue") {
      setModeColor("primeBlue");
    } else if (isTheme === "theme-pink") {
      setModeColor("primePink");
    } else if (isTheme === "theme-yellow") {
      setModeColor("primeYellow");
    }
  }, [isTheme]);

  const dispatch = useAppDispatch();
  const { pokemonList, currentUrl, nextPage, prevPage, pokemon } =
    useAppSelector((s) => s.pokemon);

  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    dispatch(
      getAllpokemons({ pageUrl: currentUrl, limit, searchTerm: inputSearch })
    );
  }, []);

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    const newPageUrl = `https://pokeapi.co/api/v2/pokemon?limit=${newLimit}`;

    dispatch(
      getAllpokemons({ pageUrl: newPageUrl, limit, searchTerm: inputSearch })
    );
  };

  const handleNext = () => {
    if (nextPage) {
      dispatch(
        getAllpokemons({ pageUrl: nextPage, limit, searchTerm: inputSearch })
      );
    }
  };

  const handlePrev = () => {
    if (prevPage) {
      dispatch(
        getAllpokemons({ pageUrl: prevPage, limit, searchTerm: inputSearch })
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const filteredPokemons = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(inputSearch.toLowerCase())
  );

  const handleCardClick = (id: number) => {
    dispatch(getPokemonDetails(id.toString()));
  };

  const handleSimilarType = (type: string) => {
    setSelectedType(type);
  };

  const filteredPokemon =
    selectedType.length > 0
      ? pokemonList.filter((pokes) =>
          pokes?.data.types.find((PokesType: any) =>
            selectedType.includes(PokesType.type.name)
          )
        )
      : pokemonList;

  console.log(modeColor);

  return (
    <>
      <Nav
        inputSearch={inputSearch}
        handleSearch={handleSearch}
        setModeColor={setModeColor}
        modeColor={modeColor}
      />
      <section className={`bg-[#F6F6F6] ${isTheme} px-8 lg:px-20`}>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 py-20 xs:mx-3 xs:gap-y-16 xs:gap-x-3">
          {filteredPokemons?.map((p) => (
            <PokemonCard
              key={p.data.id}
              name={p.name}
              data={p.data}
              handleCardClick={handleCardClick}
              setIsModal={setIsModal}
              handleSimilarType={handleSimilarType}
              modeColor={modeColor}
            />
          ))}
        </div>
        <Pagination
          limit={limit}
          handleLimitChange={handleLimitChange}
          handleNext={handleNext}
          handlePrev={handlePrev}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </section>
      {isModal && (
        <Modal
          pokemon={pokemon}
          setIsModal={setIsModal}
          similarPokes={filteredPokemon}
        />
      )}
    </>
  );
};

export default Pokemon;
