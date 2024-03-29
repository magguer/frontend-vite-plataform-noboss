//Dependencies
import { Outlet } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";

//Assets
import sunicon from "../assets/images/icons/sun-icon.png";
import moonicon from "../assets/images/icons/moon-icon.png";
import Spinner from "../components/general-partials/Spinner";

function NoAuthLayout() {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }, []);

  const toggleDarkMode = () => {
    setTheme(!theme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div>
      <div className="absolute w-full flex justify-end py-2 px-2 z-50">
        <button
          className=" dark:hover:bg-darkbgprimary bg-lightbgsecondary hover:bg-lightbuttonhoversecodnary px-3 py-2 rounded transition-all duration-200"
          onClick={toggleDarkMode}
        >
          <img
            className={`w-8 invert`}
            src={theme ? sunicon : moonicon}
            alt=""
          />
        </button>
      </div>
      <div>
        <Suspense
          fallback={
            <div className="grid place-content-center h-screen w-screen">
              <Spinner />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default NoAuthLayout;
