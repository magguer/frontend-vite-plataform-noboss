// Dependencies
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Types
import { UserType } from "../../../types/UserTypes";
import { Project } from "../../../types/ProjectTypes";
// Components
import Spinner from "../../general-partials/Spinner";
import ModalLayout from "../../../layouts/ModalLayout";
//Redux
import { close, open } from "../../../redux/modalsReducer";
//Assets
import proyectosicon from "../../../assets/images/icons/Proyectos.png";
import clientIcon from "../../../assets/images/icons/clients-icon.png";
import arrowIcon from "../../../assets/images/icons/arrow-down-icon.png";
import searchIcon from "../../../assets/images/icons/search-icon.png";

export default function AccesssProjectModal() {
  const controllerRef = useRef<AbortController | null>();
  const dispatch = useDispatch();
  const user = useSelector((state: UserType) => state.user);
  const [loading, setLoading] = useState(false);
  const [searchProject, setSearchProject] = useState<string>();
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    setLoading(true);
    const SearchProjects = async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;
      try {
        const response = await axios({
          url: `${
            import.meta.env.VITE_API_URL
          }/project/?search=${searchProject}`,
          method: "get",
          signal: controllerRef.current?.signal,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        controllerRef.current = null;
        setProjects(response.data);
        setLoading(false);
      } catch (e) {}
    };
    let delay = setTimeout(() => {
      if (searchProject) {
        SearchProjects();
      } else {
        setProjects(null);
        setLoading(false);
      }
    }, 500);
    return () => {
      clearTimeout(delay);
    };
  }, [searchProject]);

  const handleSearchProject = (e) => {
    setSearchProject(e.target.value);
  };

  const handleSendPetition = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios({
      method: "patch",
      url: `${import.meta.env.VITE_API_URL}/project`,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(close(null));
  };

  return (
    <>
      <ModalLayout exit={() => dispatch(close(null))}>
        {/*    Form Add Product */}
        <div className="bg-lightbgprimary dark:bg-darkbgprimary text-textlightprimary dark:text-textdarkprimary rounded p-7">
          <div className="grid tablet:flex tablet:gap-3 justify-center w-full">
            {/*          ADD INFO PROJECT */}
            <div>
              {/*   Header Page 1 */}
              <div className="flex justify-center items-center gap-5 mb-5">
                <div className="flex flex-col text-center items-center">
                  <h3 className="text-xs text-textprimary">
                    <em>ACCEDE A</em>
                  </h3>
                  <img
                    className="w-40 invert dark:invert-0"
                    src={proyectosicon}
                    alt=""
                  />
                  <h3 className="text-xs">
                    ya <span className="text-secondarycolor">creados</span> por
                    otros Usuarios.
                  </h3>
                </div>
              </div>
              <div className="px-2">
                {/*       ACCESS PROJECT */}
                <div className="grid gap-5 w-full mobilXL:w-[380px] fade-in-right">
                  {/*   Form Search Project */}
                  <div className="bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                    <div className="w-full flex flex-col justify-between gap-5">
                      <div className="flex flex-col gap-2 w-full items-center">
                        {/* Search a Project */}
                        <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbgprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                          <input
                            className="text-xs tablet:text-sm tablet:m-1 w-36 mobilS:w-44 mobilL:w-72 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-700 dark:placeholder:text-gray-500 dark:text-textdarkprimary text-textlightprimary"
                            type="text"
                            value={searchProject}
                            onChange={handleSearchProject}
                            name="project-name"
                            id="project-name"
                            placeholder="Buscar proyectos por nombre..."
                          />
                          <div className="text-white grid place-content-center bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg w-6 h-6 tablet:w-7 tablet:h-7 m-1 cursor-pointer transition-color duration-200">
                            {loading ? (
                              <Spinner />
                            ) : (
                              <img
                                className="w-5 dark:invert"
                                src={searchIcon}
                                alt="search"
                              />
                            )}
                          </div>
                        </div>
                        <div className="h-[calc(100vh-430px)] tablet:h-[calc(100vh-450px)] overflow-auto scrollbar-none">
                          {projects ? (
                            <ul className="grid gap-2">
                              {projects.map((project) => {
                                return (
                                  <li
                                    key={project._id}
                                    className="flex items-center gap-5 w-36 mobilS:w-44 mobilL:w-80 bg-darkbgprimary rounded-lg py-1 px-3"
                                  >
                                    <img
                                      className="w-6 tablet:w-7 object-contai rounded-full"
                                      src={`${
                                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                                      }/projects/logos/${project.logo_url}`}
                                      alt=""
                                    />
                                    <div className="grid justify-center w-full">
                                      <h3 className="text-sm text-center px-3 max-w-[180px] truncate">
                                        {project.name}
                                      </h3>
                                      <h3
                                        style={{ color: project.color_one }}
                                        className="text-xs text-center max-w-[180px] truncate"
                                      >
                                        {project.heading.name}
                                      </h3>
                                    </div>
                                    <button className="flex items-center text-xs gap-1 rounded-md bg-darkbgunder p-2">
                                      <img
                                        className="w-5"
                                        src={clientIcon}
                                        alt=""
                                      />
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <div className="grid place-content-center gap-3 h-full w-full opacity-50">
                              <img
                                className="w-14 m-auto laptop:w-20 dark:invert"
                                src={searchIcon}
                                alt=""
                              />
                              <h3 className="text-sm">Busca un Proyecto</h3>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*   Buttons Page 1 */}
                  <div>
                    <div className="flex gap-3 my-1">
                      <button
                        onClick={() => dispatch(close(null))}
                        type="button"
                        className="w-full text-center  bg-lightbgsecondary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary hover:bg-lightbuttonprimary rounded-lg py-2 tablet:py-3 transition-all duration-150"
                      >
                        Salir
                      </button>
                    </div>
                  </div>
                  <div className="text-sm flex gap-3 items-center justify-center">
                    No encontrás el proyecto?{""}
                    <button
                      onClick={() => dispatch(open("addProject"))}
                      type="button"
                      className="bg-secondarycolor bg-opacity-30 hover:bg-opacity-100 px-2 py-1 rounded transition-all duration-150"
                    >
                      Crealo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalLayout>
    </>
  );
}
