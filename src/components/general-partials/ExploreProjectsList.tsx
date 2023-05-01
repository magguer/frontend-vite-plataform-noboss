import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/projectReducer";
import { UserType } from "../../types/UserTypes";
import { Project } from "../../types/ProjectTypes";
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
        <div className=" grid gap-3 bg-darkbgprimary rounded-md w-full px-4 py-3">
            {projects.map((project: Project) => {
                return (
                    <button
                        className="group relative h-[40px] flex w-full items-center
                        cursor-pointer transition-colors duration-150 rounded-full"
                        key={project.id}
                    >
                        <div className="absolute h-full w-full z-20 rounded-full p-1">
                            <div className="bg-black h-full w-full rounded-full opacity-40 group-hover:opacity-70 transition-all duration-200"></div>
                        </div>
                        <img
                            className="w-full z-10 h-full rounded-full object-cover absolute"
                            src={`${
                                import.meta.env.VITE_SUPABASE_BUCKET_URL
                            }/projects/banners/${
                                project.banners_url[0]
                                    ? project.banners_url[0]
                                    : "default-banner.png"
                            }`}
                            alt=""
                        />
                        <div className="flex z-20 items-center justify-between w-full pl-2 pr-2">
                            <div className="flex  gap-4  items-center">
                                <img
                                    className="w-7 rounded-full"
                                    src={`${
                                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                                    }/projects/logos/${project.logo_url}`}
                                    alt=""
                                />
                                <div className="hidden laptop:grid w-full text-center">
                                    <h3 className="max-w-[140px] text-xs font-semibold truncate">
                                        {project.name}
                                    </h3>
                                </div>
                            </div>
                            <img
                                className="w-4"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/headings/icons/${
                                    project.headings[0].icon_url
                                }`}
                                alt=""
                            />
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

export default ExploreProjectsList;
