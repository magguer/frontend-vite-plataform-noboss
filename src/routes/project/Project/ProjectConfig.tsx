//Dependencies
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Types
import { ProjectType } from "../../../types/ProjectTypes";
import { UserType } from "../../../types/UserTypes";
//Redux
import { edit, remove } from "../../../redux/projectReducer";
import { editProject, removeProject } from "../../../redux/projectsReducer";
//Components
import TeamList from "../../../components/project/Project/TeamList";
//Assets
import editIcon from "../../../assets/images/icons/edit-icon.png";
import deleteIcon from "../../../assets/images/icons/delete-icon.png";
import arrowIcon from "../../../assets/images/icons/arrow-down-icon.png";

function ProjectConfig() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const project = useSelector((state: ProjectType) => state.project);
  const user = useSelector((state: UserType) => state.user);
  const roleProject = useSelector((state: any) => state.roleProject);

  const [name, setName] = useState<string>(project.name);
  const [services, setServices] = useState<boolean>(project.services_on);
  const [products, setProducts] = useState<boolean>(project.products_on);
  const [public_project, setPublic_project] = useState<boolean>(project.public);
  const [provider_project, setProvider_project] = useState<boolean>(
    project.provider
  );
  const [color_one, setColor_one] = useState<string>(project.color_one);
  const [color_two, setColor_two] = useState<string>(project.color_two);
  const [originalHeading, setOriginalHeading] = useState<string>(
    project.heading._id
  );
  const [heading, setHeading] = useState<string>(project.heading._id);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    setName(project.name);
    setColor_one(project.color_one);
    setColor_two(project.color_two);
    setHeading(project.heading._id);
    setOriginalHeading(project.heading._id);
    setServices(project.services_on);
    setProducts(project.products_on);
    setPublic_project(project.public);
    setProvider_project(project.provider);
  }, [project]);

  useEffect(() => {
    const getHeadings = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/heading`,
        method: "get",
      });
      setHeadings(response.data);
    };
    getHeadings();
  }, []);

  const hanldeDeleteProjet = async (e) => {
    await axios({
      url: `${import.meta.env.VITE_API_URL}/project/${project._id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(removeProject(project._id));
    dispatch(remove(null));
    navigate("/resumen");
  };

  const handleEditProject = async (e) => {
    e.preventDefault();
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL}/project/${project._id}`,
      method: "patch",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        name,
        services,
        products,
        public_project,
        provider_project,
        color_one,
        color_two,
        originalHeading,
        heading,
      },
    });
    dispatch(edit(response.data));
    dispatch(editProject(response.data));
    navigate("/resumen");
  };

  return (
    <div className="fade-in-right">
      <div className="relative w-full text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-sm absolute left-1 z-50 top-1 bg-lightbgprimary dark:bg-darkbgprimary p-2 rounded"
        >
          <img
            className="w-3 rotate-90 invert dark:invert-0"
            src={arrowIcon}
            alt=""
          />
        </button>
        {/* Dashboard Banners */}
        <div className="absolute z-40 flex justify-center w-full top-7 tablet:top-14">
          <button className="absolute bg-lightbgprimary dark:bg-darkbgprimary w-14 tablet:w-20 h-14 tablet:h-20 rounded-full grid place-content-center opacity-0 hover:opacity-95 transition-all duration-200">
            <input
              className="absolute opacity-0 h-20 w-20 cursor-pointer"
              type="file"
              name="editlogo"
              id="editlogo"
            />
            <img
              className="w-3 invert dark:invert-0 pointer-events-none"
              src={editIcon}
              alt=""
            />
          </button>
          <img
            className="w-14 tablet:w-20 object-contain rounded-full"
            src={`${import.meta.env.VITE_SUPABASE_BUCKET_URL}/projects/${
              project._id
            }/logo/${project.logo_url}`}
            alt="banner"
          />
        </div>
        <div className="w-full">
          {project.banner_url ? (
            <div className="relative flex justify-center">
              <button className="absolute right-1 top-1 bg-lightbgprimary dark:bg-darkbgprimary p-2 rounded">
                <img
                  className="w-3 invert dark:invert-0"
                  src={editIcon}
                  alt=""
                />
              </button>
              <img
                className="w-full h-[60px] tablet:h-[100px] object-cover rounded-t"
                src={`${import.meta.env.VITE_SUPABASE_BUCKET_URL}/projects/${
                  project._id
                }/banner/${project.banner_url}`}
                alt=""
              />
            </div>
          ) : (
            <div className="relative flex justify-center">
              <button className="absolute right-1 top-1 bg-lightbgprimary dark:bg-darkbgprimary p-2 rounded">
                <img
                  className="w-3 invert dark:invert-0"
                  src={editIcon}
                  alt=""
                />
              </button>
              <img
                className="w-full h-[60px] tablet:h-[100px] object-cover rounded-t"
                src={`${
                  import.meta.env.VITE_SUPABASE_BUCKET_URL
                }/projects/default/banner/default-banner.png`}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      <div className="tablet:flex text-textlightprimary dark:text-textdarkprimary gap-2 pt-8 tablet:py-2 h-[calc(100dvh-180px)] tablet:h-[calc(100dvh-180px)] overflow-auto scrollbar-none scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded px-2">
        {/*  PROJECT PROFILE INFO */}
        {roleProject.matriz.editProject && (
          <div className="w-full relative bg-lightbgunder dark:bg-darkbgunder rounded">
            <form onSubmit={handleEditProject} className="mt-2 pb-14">
              <div className="px-2">
                {/*     Name, Heading */}
                <div className="tablet:flex gap-4">
                  {/*   Project Name */}
                  <div className=" w-full">
                    <label
                      className="ml-1 text-start text-xs"
                      htmlFor="category"
                    >
                      Nombre*
                    </label>
                    <input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                      className="focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 p-2 w-full rounded-md"
                      required
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                    />
                  </div>
                  {/*    Project Heading */}
                  <div className="grid gap-1 w-full">
                    <label
                      className="ml-1 text-start text-xs"
                      htmlFor="category"
                    >
                      Rubro*
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500">
                        <select
                          className="text-sm w-full border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
                          name="heading"
                          id="heading"
                          onChange={(e: any) => setHeading(e.target.value)}
                        >
                          <option value={project.heading._id}>
                            {project.heading.name}
                          </option>
                          {headings.map((heading: any) => {
                            if (heading._id !== project.heading._id) {
                              return (
                                <option value={heading._id} key={heading._id}>
                                  {heading.name}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>

                      <button
                        type="button"
                        className="bg-lightbgprimary dark:bg-darkbgprimary w-[80px] h-full rounded-md text-xs"
                      >
                        Sugerir
                      </button>
                    </div>
                  </div>
                </div>
                {/*    Colors */}
                <div className="tablet:flex gap-4 mt-2">
                  {/*    Project Colors */}
                  <div className="grid w-full">
                    <label
                      className="ml-1 text-start text-xs"
                      htmlFor="category"
                    >
                      Colores*
                    </label>
                    <div className="flex text-xs text-center items-center gap-2">
                      <div className="w-full">
                        <input
                          className="bg-transparent w-full h-10"
                          onChange={(e: any) => setColor_one(e.target.value)}
                          value={color_one}
                          type="color"
                          name="color_one"
                          id="color_one"
                        />
                        <h3>Primario</h3>
                      </div>
                      <div className="w-full">
                        <input
                          className="bg-transparent w-full h-10"
                          onChange={(e: any) => setColor_two(e.target.value)}
                          value={color_two}
                          type="color"
                          name="color_two"
                          id="color_two"
                        />
                        <h3>Secundario</h3>
                      </div>
                    </div>
                  </div>
                </div>
                {/*     Products_On, Services_On */}
                <div className="grid mt-2">
                  <label className="ml-1 text-start text-xs" htmlFor="category">
                    Nos dedicamos a*
                  </label>
                  <div className="flex justify-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setProducts(!products)}
                      style={{
                        backgroundColor: products && project.color_one,
                      }}
                      className={`
                                        bg-lightbgprimary dark:bg-darkbgprimary w-full text-sm py-3 rounded transition-all duration-150`}
                    >
                      Comerciar productos
                    </button>
                    <button
                      type="button"
                      style={{
                        backgroundColor: services && project.color_one,
                      }}
                      onClick={() => setServices(!services)}
                      className={`bg-lightbgprimary dark:bg-darkbgprimary w-full text-sm py-3 rounded transition-all duration-150`}
                    >
                      Realizar servicios
                    </button>
                  </div>
                </div>
                {/*     Public, Provider */}
                <div className="grid mt-2">
                  <div className="flex justify-center gap-2 mt-2">
                    <div className="grid w-full">
                      <label
                        className="ml-1 text-start text-xs"
                        htmlFor="category"
                      >
                        Exposición
                      </label>
                      <button
                        type="button"
                        onClick={() => setPublic_project(!public_project)}
                        style={{
                          backgroundColor: public_project && project.color_one,
                        }}
                        className={`
                                            bg-lightbgprimary dark:bg-darkbgprimary mt-2 w-full text-sm py-3 rounded transition-all duration-150`}
                      >
                        {public_project ? "Público" : "Privado"}
                      </button>
                    </div>
                    <div className="grid w-full">
                      <label
                        className="ml-1 text-start text-xs"
                        htmlFor="category"
                      >
                        Proyecto Proveedor
                      </label>
                      <button
                        type="button"
                        style={{
                          backgroundColor:
                            provider_project && project.color_one,
                        }}
                        onClick={() => setProvider_project(!provider_project)}
                        className={` bg-lightbgprimary dark:bg-darkbgprimary mt-2 w-full text-sm py-3 rounded transition-all duration-150`}
                      >
                        Proveedor
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={hanldeDeleteProjet}
                    className="bg-red-800 flex items-center justify-center gap-3 px-5 py-3 opacity-70 hover:opacity-100 duration-150 transition-color rounded-md"
                  >
                    Eliminar Proyecto
                    <img src={deleteIcon} className="w-4 dark:invert" alt="" />
                  </button>
                </div>
              </div>
              <button
                style={{
                  backgroundColor: project.color_one,
                }}
                className="absolute flex items-center justify-center gap-3 bottom-0 py-3 duration-150 transition-color w-full rounded-b-md"
              >
                Editar Proyecto
                <img
                  src={editIcon}
                  className="w-4 invert dark:invert-0"
                  alt=""
                />
              </button>
            </form>
          </div>
        )}
        {/*  TEAM */}
        <TeamList project={project} />
      </div>
    </div>
  );
}

export default ProjectConfig;
