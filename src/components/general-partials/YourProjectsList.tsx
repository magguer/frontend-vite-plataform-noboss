//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
//Redux
import { add } from "../../redux/projectReducer";
import { removeCartEveryProducts } from "../../redux/cartReducer";
import { open } from "../../redux/modalsReducer";
import { getProjetsList } from "../../redux/projectsReducer";
//Types
import ProjectsTypes from "../../types/ProjectsType";
import { ProjectType } from "../../types/ProjectTypes";

function YourProjectsList() {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const projects = useSelector((state: ProjectsTypes) => state.projects);
    const globalProject = useSelector((state: ProjectType) => state.project);

    useEffect(() => {
        dispatch(getProjetsList(user.projects));
    }, []);

    const handleAddProject = (project: any) => {
        dispatch(add(project));
    };

    return (
        <div className="flex tablet:max-h-[calc(100vh-85px)] overflow-auto scrollbar-none bg-lightbgprimary dark:bg-darkbgprimary rounded-md min-w-[100px] w-full px-2 gap-2 py-3 text-textlightprimary dark:text-textdarkprimary">
            <div className="grid gap-3">
                {projects?.map((project: any) => {
                    return (
                        <button
                            onClick={() => {
                                handleAddProject(project);
                                dispatch(removeCartEveryProducts());
                            }}
                            style={{ borderColor: project?.color_one }}
                            className={`${
                                project.slug === globalProject?.slug &&
                                `border-2 border-[${globalProject?.color_one}]`
                            } flex w-full items-center gap-4 bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary hover:dark:bg-transparent px-4
                        py-3 cursor-pointer transition-colors duration-150 rounded`}
                            key={project._id}
                        >
                            <img
                                className="w-14 object-cover rounded-full"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/logos/${project.logo_url}`}
                                alt=""
                            />
                        </button>
                    );
                })}
                <button
                    onClick={() => dispatch(open("addProject"))}
                    className="flex justify-center font-semibold items-center gap-4 bg-lightbuttonprimary dark:bg-darkbuttonhoverprimary hover:bg-transparent p-3 cursor-pointer transition-colors duration-150 h-[60px] min-w-[80px]"
                >
                    <h3 className="w-full">+</h3>
                </button>
            </div>
        </div>
    );
}

export default YourProjectsList;
