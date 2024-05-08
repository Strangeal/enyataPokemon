import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import logo from "../../public/assets/splash-group.svg";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setModeColor, setTheme } from "../redux/pokemon/pokemonSlice";

const Home = () => {
  const { modeColor, theme } = useAppSelector((s) => s.pokemon);

  const dispatch = useAppDispatch();
  const isTheme = localStorage.getItem("theme") || theme;
  document.documentElement.className = isTheme;

  useEffect(() => {
    if (isTheme === "theme-blue") {
      dispatch(setModeColor("primeBlue"));
    } else if (isTheme === "theme-pink") {
      dispatch(setModeColor("primePink"));
    } else if (isTheme === "theme-yellow") {
      dispatch(setModeColor("primeYellow"));
    }

    dispatch(setTheme(isTheme));
  }, [dispatch, isTheme, setModeColor]);

  return (
    <>
      <section
        className={`px-5 h-screen flex flex-col justify-center items-center max-w-xl mx-auto blue:bg-blue-400`}
      >
        <div className="space-y-3 flex flex-col items-center">
          <a href="/">
            <img className="mx-auto" src={logo} alt="" />
          </a>
          <h1 className="text-5xl font-bold text-center">
            Poké
            <span className={`text-${modeColor}`}>book</span>
          </h1>
          <p className="text-center w-[80%]">
            Largest Pokémon index with information about every Pokemon you can
            think of.
          </p>
        </div>

        <div className="flex flex-col items-center w-full my-20 space-y-5">
          <div className="relative w-full">
            <input
              className={`border-${modeColor} p-3 border-4 rounded-full w-full outline-none`}
              type="text"
              placeholder="Enter pokemon name"
            />
            <button type="button" className="absolute right-3 top-2.5">
              <IoSearch
                size={35}
                className={`bg-${modeColor} text-white rounded-full p-2`}
              />
            </button>
          </div>
          <a
            className="underline text-black font-light text-center"
            href="/list"
          >
            View all
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
