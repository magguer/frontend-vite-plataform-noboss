import { useSelector } from "react-redux";
import ProjectTypes from "../../types/ProjectTypes";
import UserTypes from "../../types/UserTypes";

function Dashboard() {
    const project = useSelector((state: ProjectTypes) => state.project);
    const user = useSelector((state: UserTypes) => state.user);

    /*     const role = project?.roles.filter(
        () => user.roles.id === project?.roles.id
    ); */

    return (
        <>
            {project ? (
                <div className="w-full  ">
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
                    <div className="px-8">
                        {project.banners_url[0] !== "" && (
                            <div className="mt-3 flex justify-center">
                                <img
                                    className="w-full h-[100px] object-cover rounded"
                                    src={`${
                                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                                    }/projects/banners/${project.banners_url}`}
                                    alt=""
                                />
                            </div>
                        )}
                        {/*  Rol // Mensajería */}
                        <div className="mt-2 flex justify-between">
                            <div className="flex gap-1">
                                <h3 className="text-sm font-medium">
                                    {/* {role[0].name} */}Panel
                                </h3>
                                <h3 className="text-sm font-medium text-secondarycolor">
                                    {/* {role[0].name} */}Administración
                                </h3>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-darkbgsecondary hover:bg-darkbgunder duration-200 transition-colors px-3 py-1 rounded font-medium text-sm">
                                    <img
                                        className="w-5"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/chat-icon.png`}
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                        {/*  All Functions */}
                        <div className="flex w-full mt-2 gap-3">
                            <div className="w-2/12">
                                <button className="h-full w-full grid justify-center items-center bg-darkbgsecondary hover:bg-darkbgunder duration-200 transition-colors font-semibold text-lg rounded">
                                    <h3>Gasto</h3>
                                    <img
                                        className="w-12"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/gasto-icon.png`}
                                        alt=""
                                    />
                                </button>
                            </div>
                            <div className="w-8/12 grid gap-3">
                                <div className="flex justify-center gap-3 w-full">
                                    {/* Inventario */}
                                    <button className="bg-darkbgsecondary hover:bg-darkbgunder duration-200 transition-colors font-semibold text-xl w-full py-3 px-4 rounded">
                                        <h3 className="text-start">
                                            Inventario
                                        </h3>
                                        <div className="flex justify-end">
                                            <img
                                                className="w-10"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SUPABASE_BUCKET_URL
                                                }/noboss/icons/nobox-icon.png`}
                                                alt=""
                                            />
                                        </div>
                                    </button>
                                    {/* Clientes */}
                                    <button className="bg-darkbgsecondary hover:bg-darkbgunder duration-200 transition-colors font-semibold text-xl w-full py-3 px-4 rounded">
                                        <h3 className="text-start">Clientes</h3>
                                        <div className="flex justify-end">
                                            <img
                                                className="w-9"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SUPABASE_BUCKET_URL
                                                }/noboss/icons/clients-icon.png`}
                                                alt=""
                                            />
                                        </div>
                                    </button>
                                    {/* Servicios */}
                                    <button className="bg-darkbgsecondary hover:bg-darkbgunder duration-200 transition-colors font-semibold text-xl w-full py-3 px-4 rounded">
                                        <h3 className="text-start">
                                            Servicios
                                        </h3>
                                        <div className="flex justify-end">
                                            <img
                                                className="w-10"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SUPABASE_BUCKET_URL
                                                }/noboss/icons/nobox-icon.png`}
                                                alt=""
                                            />
                                        </div>
                                    </button>
                                </div>
                                <div className="flex justify-center gap-3 w-full">
                                    {/* Resumen */}
                                    <button className="bg-darkbgsecondary hover:bg-darkbgunder duration-200 transition-colors font-semibold text-xl w-full py-3 px-4 rounded">
                                        <h3 className="text-start">Resumen</h3>
                                        <div className="flex justify-end">
                                            <img
                                                className="w-7"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SUPABASE_BUCKET_URL
                                                }/noboss/icons/summary-icon.png`}
                                                alt=""
                                            />
                                        </div>
                                    </button>
                                    {/* Comunidad */}
                                    <button className="bg-darkbgsecondary hover:bg-darkbgunder duration-200 transition-colors font-semibold text-xl w-full py-3 px-4 rounded">
                                        <h3 className="text-start">
                                            Comunidad
                                        </h3>
                                        <div className="flex justify-end">
                                            <img
                                                className="w-9"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SUPABASE_BUCKET_URL
                                                }/noboss/icons/clients-icon.png`}
                                                alt=""
                                            />
                                        </div>
                                    </button>
                                    {/* Agenda */}
                                    <button className="bg-darkbgsecondary hover:bg-darkbgunder duration-200 transition-colors font-semibold text-xl w-full py-3 px-4 rounded">
                                        <h3 className="text-start">Agenda</h3>
                                        <div className="flex justify-end">
                                            <img
                                                className="w-8"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SUPABASE_BUCKET_URL
                                                }/noboss/icons/diary-icon.png`}
                                                alt=""
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="w-2/12">
                                <button className="h-full w-full grid justify-center items-center bg-darkbgsecondary hover:bg-darkbgunder duration-200 transition-colors font-semibold text-lg rounded">
                                    <h3> Venta</h3>
                                    <img
                                        className="w-12"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/venta-icon.png`}
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Sin Proyecto Seleccionado
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
