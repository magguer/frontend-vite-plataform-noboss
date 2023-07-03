import { useState } from "react";
//Assets
import searchIcon from "../../../assets/images/icons/search-icon.png";
import TeamTableBody from "../Team/TeamTableBody";

function TeamList({ project }) {
  const [search, setSearch] = useState("");

  return (
    <div className="relative bg-lightbgunder dark:bg-darkbgunder p-2 rounded w-full">
      <h3 className="text-center text-sm">Miembros de {project.name}</h3>
      {/* Actions */}
      <div className="absolute bottom-3 flex justify-center w-full">
        <div
          className={` bg-lightbgunder dark:bg-darkbgprimary z-30 py-4 px-3 rounded-md shadow-lg  transition-all duration-200`}
        >
          {/* Searcher */}
          <div className="flex justify-end tablet:justify-center gap-1 mobilXL:gap-2 items-center">
            <div className=" bg-lightbgprimary dark:text-textdarkprimary text-textlightprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbgunder dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
              <input
                className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 tablet:w-72  py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                type="text"
                name="search"
                id="search"
                placeholder="Buscar nombre, rol, id..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
                <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                  <img
                    className="w-3 tablet:w-4 opacity-60 group-hover:opacity-100 dark:invert transition-all duration-150"
                    src={searchIcon}
                    alt=""
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-1 h-[calc(100dvh-255px)] tablet:h-[calc(100dvh-240px)] first-letter: overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
        {project.members.map((user: any) => {
          return (
            <TeamTableBody
              project={project}
              key={user.member._id}
              user={user}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TeamList;
