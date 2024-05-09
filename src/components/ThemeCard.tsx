import { useRef } from "react";
import useClickOutside from "./hooks/UseClickOutside";
import { useAppDispatch } from "../redux/hooks";

type ThemeProps = {
  setTheme: any;
  setOpenTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeCard = ({ setTheme, setOpenTheme }: ThemeProps) => {
  const themeValue = ["primeBlue", "primePink", "primeYellow"];

  const options = [
    {
      mode: "bluetheme",
      color: "primeBlue",
    },
    {
      mode: "yellowtheme",
      color: "primeYellow",
    },
    {
      mode: "pinktheme",
      color: "primePink",
    },
  ];
  const dispatch = useAppDispatch();
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setOpenTheme(false));

  return (
    <div className="fixed bg-gray-500 w-full h-screen px-10 left-0 bottom-0 z-50 bg-opacity-60">
      <div
        ref={containerRef}
        className="rounded-3xl w-80 max-w-[90%] mx-auto bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <p className="p-3 font-medium text-xl text-center">Choose Theme</p>
        <div className="bg-gray-300 h-40 rounded-b-3xl flex items-center gap-3 justify-center">
          {options.map((opt: any, index: number) => (
            <button
              key={index}
              data-choose-theme
              onClick={() => {
                dispatch(setTheme(opt.mode));
                setOpenTheme(false);
              }}
              type="button"
              className="border border-gray-400 p-0.5 rounded-full hover:border-gray-600 transform"
            >
              <p
                className={`h-12 w-12 max-w-[80px] bg-${opt.color} block rounded-full `}
              ></p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeCard;
