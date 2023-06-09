import { useSelector } from "react-redux";
import { ProjectType } from "../../types/ProjectTypes";
// Assets
import marketimage from "../../assets/images/no_market_image.svg";

function Market() {
    const project = useSelector((state: ProjectType) => state.project);
    return (
        <>
            {project ? (
                <div className="w-full h-full p-4 fade-in-left dark:text-textdarkprimary text-textlightprimary">
                    <div className="relative w-full h-full grid justify-center text-center">
                        <div className="absolute right-0">
                            <img
                                className="w-10 object-contain rounded-full"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/logos/${project?.logo_url}`}
                                alt=""
                            />
                        </div>
                        <div>
                            <h3>Market</h3>
                            <h3
                                style={{ color: `${project.color_one}` }}
                                className=" font-medium text-sm"
                            >
                                {project?.heading.name}
                            </h3>
                        </div>
                        <div className="grid h-full justify-center">
                            <div className="flex flex-col gap-8">
                                <img
                                    className="w-60"
                                    src={marketimage}
                                    alt=""
                                />
                                <h3 className="text-xl">Próximamente...</h3>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full p-4 fade-in-left dark:text-textdarkprimary text-textlightprimary">
                    <div className="relative w-full h-full grid justify-center text-center">
                        <div>
                            <h3>Market</h3>
                            <h3 className="text-secondarycolor font-medium text-sm">
                                Accede a un proyecto para la experiencia
                                completa.
                            </h3>
                        </div>
                        <div className="grid h-full justify-center">
                            <div className="flex flex-col gap-8">
                                <img
                                    className="w-60"
                                    src={marketimage}
                                    alt=""
                                />
                                <h3 className="text-xl">Próximamente...</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Market;
