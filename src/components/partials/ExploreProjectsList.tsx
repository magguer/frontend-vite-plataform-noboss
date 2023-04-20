import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/projectReducer";
import UserTypes from "../../types/UserTypes";
import ProjectTypes from "../../types/ProjectTypes";
import axios from "axios";
import { useEffect, useState } from "react";

function ExploreProjectsList() {
    const dispatch = useDispatch();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/project?public=true`,
                method: "get",
            });

            setProjects(response.data);
        };
        getProjects();
    }, []);

    return (
        <div className="grid gap-3 bg-darkbgprimary rounded-md w-full px-4 py-3">
            {projects.map((project: ProjectTypes) => {
                return (
                    <button
                        className="flex w-full items-center gap-4 bg-darkbuttonhoverprimary hover:bg-transparent pl-3 px-10
                        py-1 cursor-pointer transition-colors duration-150 rounded-full"
                        key={project.id}
                    >
                        <img
                            className="w-8 rounded-full"
                            src={`${
                                import.meta.env.VITE_SUPABASE_BUCKET_URL
                            }/projects/logos/${project.logo_url}`}
                            alt=""
                        />
                        <div className="hidden laptop:block text-start">
                            <h3 className="max-w-[150px] text-sm font-semibold truncate">
                                {project.name}
                            </h3>
                            <h3 className="max-w-[150px] text-xs font-medium text-secondarycolor truncate">
                                {project.headings[0].name}
                            </h3>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

export default ExploreProjectsList;
