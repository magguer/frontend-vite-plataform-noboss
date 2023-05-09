import { useSelector } from "react-redux";
import "../../../animations/animations.css";
import { ProjectType } from "../../../types/ProjectTypes";
import TeamTableBody from "../../../components/project/Team/TeamTableBody";
import { useState } from "react";
function Team() {
    const [search, setSearch] = useState("");
    const project = useSelector((state: ProjectType) => state.project);
    return (
        <div className="w-full fade-in-left">
            {/* Searcher */}
            <div className="flex justify-end tablet:justify-center mt-2 gap-1 mobilXL:gap-2 items-center">
                <div className="dark:text-textdarkprimary text-textlightprimary bg-lightbgprimary hover:bg-lightbgunder  focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                    <input
                        className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 laptop:w-96 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Buscar nombre, id, rol..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button>
                        <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                            <img
                                className="w-3 tablet:w-5"
                                src="https://firebasestorage.googleapis.com/v0/b/noboss-app.appspot.com/o/nobossAppSimple%2Frecursos%2Ficonos%2Ficono%20explorador%20de%20proyectos%20blanco.png?alt=media&token=a9ae2846-f5af-4aa7-9c60-681f478c967a"
                                alt=""
                            />
                        </div>
                    </button>
                </div>
            </div>
            <div className="mt-2 flex flex-col gap-1  h-[calc(100vh-250px)] tablet:h-[calc(100vh-285px)] first-letter: overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
                {project.members.map((user: any) => {
                    return <TeamTableBody key={user.member._id} user={user} />;
                })}
            </div>
        </div>
    );
}

export default Team;
