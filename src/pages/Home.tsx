import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Home = () => {
  const [modeColor, setModeColor] = useState("primeBlue");
  const [isTheme, setIsTheme] = useState(
    () => localStorage.getItem("theme") || "theme-blue"
  );

  useEffect(() => {
    document.documentElement.className = isTheme;

    if (isTheme === "theme-blue") {
      setModeColor("primeBlue");
    } else if (isTheme === "theme-pink") {
      setModeColor("primePink");
    } else if (isTheme === "theme-yellow") {
      setModeColor("primeYellow");
    }
  }, [isTheme]);

  return (
    <>
      <section
        className={`px-5 h-screen flex flex-col justify-center items-center max-w-xl mx-auto blue:bg-blue-400`}
      >
        <div className="space-y-3">
          <img
            className="mx-auto"
            src="../../public/assets/splash-group.svg"
            alt=""
          />
          <h1 className="text-5xl font-bold text-center">
            Poké<span className={`text-${modeColor}`}>book</span>
          </h1>
          <p>
            Largest Pokémon index with information about every Pokemon you can
            think of.
          </p>
        </div>

        <div className="flex flex-col items-center w-full my-20 space-y-5">
          <div className="relative w-full">
            <input
              className={`p-3 border-${modeColor} border-4 rounded-full w-full outline-none`}
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
