//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Redux
import { add } from "../../../redux/projectReducer";
import { removeCartEveryProducts } from "../../../redux/cartReducer";
import { open } from "../../../redux/modalsReducer";
import { getProjetsList } from "../../../redux/projectsReducer";
//Types
import ProjectsTypes from "../../../types/ProjectsType";
import { ProjectType } from "../../../types/ProjectTypes";
//Assets
import configIcon from "../../../assets/images/icons/config-icon.png";
import axios from "axios";

function YourProjectsList({ setShowSelectProjects }: any) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const projects = useSelector((state: ProjectsTypes) => state.projects);
  const globalProject = useSelector((state: ProjectType) => state.project);

  useEffect(() => {
    const getUserProjects = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/user/${user.id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(getProjetsList(response.data.projects));
    };
    getUserProjects();
  }, []);

  const handleAddProject = (project: any) => {
    dispatch(add(project));
  };

  return (
    <div className="fade-in-right flex justify-center overflow-auto scrollbar-none bg-lightbgprimary dark:bg-opacity-40  bg-opacity-40 backdrop-blur-lg dark:bg-darkbgprimary rounded-full w-full px-1 gap-2 py-2 tablet:py-0.5 text-textlightprimary dark:text-textdarkprimary">
      <div className="grid tablet:flex gap-3 items-center">
        <button
          onClick={() => {
            dispatch(open("addProject")), setShowSelectProjects(false);
          }}
          className="flex justify-center items-center font-semibold"
        >
          <h3 className="w-8 tablet:w-12 h-8 tablet:h-12 object-contain rounded-full flex items-center justify-center bg-lightbuttonprimary dark:bg-darkbuttonprimary hover:bg-opacity-60 cursor-pointer transition-colors duration-150 ">
            +
          </h3>
        </button>
        {projects &&
          projects.map((project: any) => {
            return (
              <button
                onClick={() => {
                  handleAddProject(project);
                  dispatch(removeCartEveryProducts());
                  setShowSelectProjects(false);
                }}
                style={{ borderColor: project?.color_one }}
                className={`${
                  project.slug === globalProject?.slug &&
                  `border-2 border-[${globalProject?.color_one}]`
                } flex w-full items-center cursor-pointer transition-colors duration-150 rounded-full`}
                key={project._id}
              >
                <img
                  className="w-8  tablet:w-12  object-contain rounded-full"
                  src={`${
                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                  }/projects/logos/${project.logo_url}`}
                  alt=""
                />
              </button>
            );
          })}

        <Link
          to={"/proyecto"}
          className="flex justify-center items-center font-semibold"
        >
          <h3
            onClick={() => setShowSelectProjects(false)}
            className="w-8 tablet:w-12 h-8 tablet:h-12 object-contain rounded-full flex items-center justify-center bg-lightbuttonprimary dark:bg-darkbuttonprimary hover:bg-opacity-60 cursor-pointer transition-colors duration-150 "
          >
            <img className="w-5 dark:invert" src={configIcon} alt="" />
          </h3>
        </Link>
      </div>
    </div>
  );
}

export default YourProjectsList;
