import { useSelector } from "react-redux";
import ProjectTypes from "../../types/ProjectTypes";
import marketimage from "../../assets/images/no_market_image.svg";

function Market() {
    const project = useSelector((state: ProjectTypes) => state.project);
    return (
        <>
            {project ? (
                <div className="w-full p-4 fade-in-left">
                    <div className="relative w-full grid justify-center text-center">
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
                            <h3 className="font-semibold">Market</h3>
                            <h3 className="text-secondarycolor font-medium text-sm">
                                {project?.headings[0].name}
                            </h3>
                        </div>
                        <div className="mt-10 grid gap-8">
                            <img className="w-60" src={marketimage} alt="" />
                            <h3 className="text-xl">Próximamente...</h3>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    <div className="relative w-full grid justify-center text-center">
                        <div>
                            <h3 className="font-semibold">Market</h3>
                        </div>
                        <h3 className="text-secondarycolor opacity-75 font-medium text-sm">
                            Prueba nuestras funciones de ahorro colectivo.
                        </h3>
                    </div>
                </div>
            )}
        </>
    );
}

export default Market;
