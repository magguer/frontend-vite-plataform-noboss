//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const [showMoreInfo, setShowMoreInfo] = useState(false);

    const handleAddProject = (project: any) => {
        dispatch(add(project));
    };

    return (
        <div className="flex tablet:max-h-[calc(100vh-85px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded bg-lightbgprimary dark:bg-darkbgprimary rounded-md min-w-[100px] w-full px-4 gap-2 py-3">
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
                            key={project.id}
                        >
                            <img
                                className="w-14 rounded-full"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/logos/${project.logo_url}`}
                                alt=""
                            />
                            {showMoreInfo && (
                                <div
                                    className={`${
                                        showMoreInfo
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } hidden laptop:block text-center transition-all duration-200 delay-75`}
                                >
                                    <h3 className="max-w-[150px] font-semibold truncate">
                                        {project.name}
                                    </h3>
                                    <h3 className="max-w-[150px] text-xs font-medium text-secondarycolor truncate">
                                        {project.headings[0].name}
                                    </h3>
                                </div>
                            )}
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
