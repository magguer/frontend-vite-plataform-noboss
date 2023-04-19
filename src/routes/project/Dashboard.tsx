import { useSelector } from "react-redux";
import ProjectTypes from "../../types/ProjectTypes";

function Dashboard() {
    const project = useSelector((state: ProjectTypes) => state.project);

    return (
        <>
            {project ? (
                <div className="w-full">
                    {/* Dashboard Header */}
                    <div className="relative w-full grid justify-center text-center">
                        <div className="absolute right-0">
                            <img
                                className="w-10 object-contain rounded-full"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/logos/${project.logo_url}`}
                                alt=""
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold">{project.name}</h3>
                            <h3 className="text-secondarycolor font-medium text-sm">
                                {project.headings[0].name}
                            </h3>
                        </div>
                    </div>
                    {/* Dashboard Banners */}
                    {project.banners_url[0] !== "" && (
                        <div className="mt-5 mx-10 flex justify-center">
                            <img
                                className="w-full h-[100px] object-cover rounded"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/banners/${project.banners_url}`}
                                alt=""
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full">
                    <div className="relative w-full grid justify-center text-center">
                        <div>
                            <h3 className="font-semibold">Dashboard</h3>
                            <h3 className="text-secondarycolor opacity-75 font-medium text-sm">
                                Selecciona, crea o accede a un proyecto.
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Dashboard;
