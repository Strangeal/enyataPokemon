import React, { useEffect, useState } from "react";
import ThemeCard from "./ThemeCard";
import logo from "../../public/assets/splash-group.svg";
import { useAppSelector } from "../redux/hooks";
import { setTheme } from "../redux/pokemon/pokemonSlice";
import { themeChange } from "theme-change";

type NavProps = {
  inputSearch: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Nav = ({ inputSearch, handleSearch }: NavProps) => {
  const { theme } = useAppSelector((s) => s.pokemon);
  const [open, setOpen] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);

  const isTheme = localStorage.getItem("theme") || theme;
  document.querySelector("html")?.setAttribute("data-theme", isTheme);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <nav>
      <div className="bg-white w-full border-gray-200 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex relative">
            <a href="/" className="absolute -top-3 -left-2 xs:-top-3 ">
              <img className="w-[55%]" src={logo} />
            </a>
            <h3 className="text-xl font-bold text-center ml-28 sm:ml-32 sm:text-2xl">
              Poké<span className="text-primary">book</span>
            </h3>
          </div>
          <div className="relative hidden md:block w-1/3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              value={inputSearch}
              onChange={handleSearch}
              type="text"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 outline-none"
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
            <button
              onClick={() => setOpenTheme(true)}
              className="border border-gray-400 p-0.5 rounded-full"
              type="button"
            >
              <span className={`h-7 w-7 bg-primary block rounded-full`}></span>
            </button>
          </div>
        </div>
        <div
          className={`items-center justify-between ${
            open ? "block pt-8" : "hidden"
          } w-full md:flex md:w-auto`}
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={inputSearch}
              onChange={handleSearch}
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>

        {openTheme && (
          <ThemeCard setTheme={setTheme} setOpenTheme={setOpenTheme} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
