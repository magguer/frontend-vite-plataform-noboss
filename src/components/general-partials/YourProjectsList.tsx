//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Redux
import { add } from "../../redux/projectReducer";
//Types
import { UserType } from "../../types/UserTypes";
import { Project } from "../../types/ProjectTypes";

function YourProjectsList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: UserType) => state.user);

    const [showMoreInfo, setShowMoreInfo] = useState(false);

    const handleAddProject = (project: Project) => {
        dispatch(add(project));
    };

    return (
        <div className="flex bg-lightbgprimary dark:bg-darkbgprimary rounded-md w-full px-4 gap-2 py-3">
            <div className="grid gap-3">
                {user?.projects.map((project: Project) => {
                    return (
                        <button
                            onClick={() => handleAddProject(project)}
                            className="flex w-full items-center gap-4 bg-lightbgsecondary hover:bg-lightbuttonringprimary dark:bg-darkbuttonhoverprimary hover:dark:bg-transparent px-4
                        py-3 cursor-pointer transition-colors duration-150 rounded"
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
                <div className="flex justify-center font-semibold items-center gap-4 bg-lightbuttonprimary dark:bg-darkbuttonhoverprimary hover:bg-transparent p-3 cursor-pointer transition-colors duration-150 h-[60px]">
                    <h3>+</h3>
                </div>
            </div>
        </div>
    );
}

export default YourProjectsList;
