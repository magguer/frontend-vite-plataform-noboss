import { useSelector } from "react-redux";
import { ProjectType } from "../../../types/ProjectTypes";

function ProjectConfig() {
    const project = useSelector((state: ProjectType) => state.project);
    return (
        <div className="fade-in-right">
            <div className="relative w-full text-center">
                {/* Dashboard Banners */}
                <div className="absolute flex justify-center w-full top-7 tablet:top-14">
                    <img
                        className="w-14 tablet:w-20 object-contain rounded-full"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/projects/logos/${project.logo_url}`}
                        alt=""
                    />
                </div>
                <div className="w-full">
                    {project.banners_url[0] ? (
                        <div className="flex justify-center">
                            <img
                                className="w-full h-[60px] tablet:h-[100px] object-cover rounded-t"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/banners/${project.banners_url}`}
                                alt=""
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <img
                                className="w-full h-[60px] tablet:h-[100px] object-cover rounded-t"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/banners/default-banner.png`}
                                alt=""
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectConfig;
