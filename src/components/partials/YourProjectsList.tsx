import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/projectReducer";
import UserTypes from "../../types/UserTypes";
import ProjectTypes from "../../types/ProjectTypes";

function YourProjectsList() {
    const dispatch = useDispatch();
    const user = useSelector((state: UserTypes) => state.user);

    const handleAddProject = (project: ProjectTypes) => {
        dispatch(add(project));
    };

    return (
        <div className="grid gap-3 bg-darkbgprimary rounded-md w-full px-4 py-3">
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
                        <div className="hidden laptop:block text-center">
                            <h3 className="max-w-[150px] font-semibold truncate">
                                {project.name}
                            </h3>
                            <h3 className="max-w-[150px] text-xs font-medium text-secondarycolor truncate">
                                {project.headings[0].name}
                            </h3>
                        </div>
                    </button>
                );
            })}
            <div className="flex justify-center font-semibold items-center gap-4 bg-darkbuttonhoverprimary hover:bg-transparent p-3 cursor-pointer transition-colors duration-150 h-[60px]">
                <h3>+</h3>
            </div>
        </div>
    );
}

export default YourProjectsList;
