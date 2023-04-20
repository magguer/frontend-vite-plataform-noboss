import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/projectReducer";
import UserTypes from "../../types/UserTypes";
import ProjectTypes from "../../types/ProjectTypes";
import { useState } from "react";

function YourProjectsList() {
    const dispatch = useDispatch();
    const user = useSelector((state: UserTypes) => state.user);

    const [showMoreInfo, setShowMoreInfo] = useState(false);

    const handleAddProject = (project: ProjectTypes) => {
        dispatch(add(project));
    };

    return (
        <div className="flex bg-darkbgprimary rounded-md w-full px-4 gap-2 py-3">
            <div className="grid gap-3">
                {user.projects.map((project: ProjectTypes) => {
                    return (
                        <button
                            onClick={() => handleAddProject(project)}
                            className="flex w-full items-center gap-4 bg-darkbuttonhoverprimary hover:bg-transparent px-4
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
                <div className="flex justify-center font-semibold items-center gap-4 bg-darkbuttonhoverprimary hover:bg-transparent p-3 cursor-pointer transition-colors duration-150 h-[60px]">
                    <h3>+</h3>
                </div>
            </div>
            {/* 
            <button
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                className="h-auto px-1 opacity-30 hover:opacity-100 hover:bg-darkbuttonhoverprimary bg-transparent transition-colors duration-150 flex items-center"
            >
                <img
                    className={`${
                        showMoreInfo ? "rotate-90" : "rotate-[270deg]"
                    } transition-all duration-100 w-2 rounded-full`}
                    src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                    }/noboss/icons/arrow-down-icon.png`}
                    alt=""
                />
            </button> */}
        </div>
    );
}

export default YourProjectsList;
