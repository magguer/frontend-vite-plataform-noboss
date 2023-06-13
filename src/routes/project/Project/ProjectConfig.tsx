//Dependencies
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//Types
import { ProjectType } from "../../../types/ProjectTypes";
//Components
import TeamTableBody from "../../../components/project/Team/TeamTableBody";
//Assets
import searchIcon from "../../../assets/images/icons/search-icon.png";
import axios from "axios";

function ProjectConfig() {
    const [search, setSearch] = useState("");
    const project = useSelector((state: ProjectType) => state.project);

    const [name, setName] = useState<string>(project.name);
    const [password, setPassword] = useState<string>(project.password);
    const [services, setServices] = useState<boolean>(project.services_on);
    const [products, setProducts] = useState<boolean>(project.products_on);
    const [publicProject, setPublicProject] = useState<boolean>(project.public);
    const [providerProject, setProviderProject] = useState<boolean>(
        project.provider
    );
    const [color_one, setColor_one] = useState<string>(project.color_one);
    const [color_two, setColor_two] = useState<string>(project.color_two);
    const [heading, setHeading] = useState<object>(project.headings[0]);
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        setName(project.name);
        setPassword(project.password);
        setColor_one(project.color_one);
        setColor_two(project.color_two);
        setHeading(project.headings[0]);
        setServices(project.services_on);
        setProducts(project.products_on);
        setPublicProject(project.public);
        setProviderProject(project.provider);
    }, [project]);

    useEffect(() => {
        const getHeadings = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/heading`,
                method: "get",
            });
            setHeadings(response.data);
            setHeading(response.data[0]);
        };
        getHeadings();
    }, []);

    return (
        <div className="fade-in-right">
            <div className="relative w-full text-center">
                {/* Dashboard Banners */}
                <div className="absolute z-40 flex justify-center w-full top-7 tablet:top-14">
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
            <div className="grid grid-cols-1 text-textlightprimary dark:text-textdarkprimary mobilXL:grid-cols-2 gap-2 tablet:grid-cols-2 pt-8 tablet:py-2 px-2">
                {/*  PROJECT PROFILE INFO */}
                <div className="relative bg-lightbgunder dark:bg-darkbgunder rounded">
                    <div className="p-2 h-[calc(100vh-210px)] tablet:h-full">
                        <h3 className="text-center text-sm">
                            Información de {project.name}
                        </h3>
                        <form action="" className="mt-2">
                            <div className="tablet:flex gap-4">
                                {/*   Project Name */}
                                <div className=" w-full">
                                    <label
                                        className="ml-1 text-start text-xs"
                                        htmlFor="category"
                                    >
                                        Nombre*
                                    </label>
                                    <input
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setName(e.target.value)}
                                        className="focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 p-2 w-full rounded-md"
                                        required
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        placeholder=""
                                        value={name}
                                    />
                                </div>
                                {/*    Project Heading */}
                                <div className="grid gap-1 w-full">
                                    <label
                                        className="ml-1 text-start text-xs"
                                        htmlFor="category"
                                    >
                                        Rubro*
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <div className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500">
                                            <select
                                                className="text-sm w-full border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                                name="heading"
                                                id="heading"
                                                onChange={(e: any) =>
                                                    setHeading(e.target.value)
                                                }
                                            >
                                                <option
                                                    value={
                                                        project.headings[0]._id
                                                    }
                                                >
                                                    {project.headings[0].name}
                                                </option>
                                                {headings.map(
                                                    (heading: any) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    heading._id
                                                                }
                                                                key={
                                                                    heading._id
                                                                }
                                                            >
                                                                {heading.name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>

                                        <button
                                            type="button"
                                            className="bg-lightbgprimary dark:bg-darkbgprimary w-[80px] mb-0.5 py-1 h-full rounded-md text-xs"
                                        >
                                            Sugerir
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="tablet:flex gap-4 mt-2">
                                {/*    Project Colors */}
                                <div className="grid w-full">
                                    <label
                                        className="ml-1 text-start text-xs"
                                        htmlFor="category"
                                    >
                                        Colores*
                                    </label>
                                    <div className="flex text-xs text-center items-center gap-2">
                                        <div className="w-full">
                                            <input
                                                className="bg-transparent w-full h-10"
                                                onChange={(e: any) =>
                                                    setColor_one(e.target.value)
                                                }
                                                value={color_one}
                                                type="color"
                                                name="products"
                                                id="products"
                                            />
                                            <h3>Primario</h3>
                                        </div>
                                        <div className="w-full">
                                            <input
                                                className="bg-transparent w-full h-10"
                                                onChange={(e: any) =>
                                                    setColor_two(e.target.value)
                                                }
                                                value={color_two}
                                                type="color"
                                                name="products"
                                                id="products"
                                            />
                                            <h3>Secundario</h3>
                                        </div>
                                    </div>
                                </div>
                                {/*   Project Password */}
                                <div className="w-full">
                                    <label
                                        className="ml-1 text-start text-xs"
                                        htmlFor="category"
                                    >
                                        Contraseña*
                                    </label>
                                    <input
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setPassword(e.target.value)}
                                        className="focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 p-2 w-full rounded-md"
                                        required
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder=""
                                        value={password}
                                    />
                                </div>
                            </div>
                            {/*     Products_On, Services_On */}
                            <div className="grid mt-2">
                                <label
                                    className="ml-1 text-start text-xs"
                                    htmlFor="category"
                                >
                                    Nos dedicamos a*
                                </label>
                                <div className="flex justify-center gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setProducts(!products)}
                                        style={{
                                            backgroundColor:
                                                products && project.color_one,
                                        }}
                                        className={`
                                                dark:bg-darkbgprimary w-full text-sm py-3 rounded transition-all duration-150`}
                                    >
                                        Comerciar productos
                                    </button>
                                    <button
                                        type="button"
                                        style={{
                                            backgroundColor:
                                                services && project.color_one,
                                        }}
                                        onClick={() => setServices(!services)}
                                        className={` dark:bg-darkbgprimary w-full text-sm py-3 rounded transition-all duration-150`}
                                    >
                                        Realizar servicios
                                    </button>
                                </div>
                            </div>
                            {/*     Public, Provider */}
                            <div className="grid mt-2">
                                <div className="flex justify-center gap-2 mt-2">
                                    <div className="grid w-full">
                                        <label
                                            className="ml-1 text-start text-xs"
                                            htmlFor="category"
                                        >
                                            Proyecto Público
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setPublicProject(!publicProject)
                                            }
                                            style={{
                                                backgroundColor:
                                                    publicProject &&
                                                    project.color_one,
                                            }}
                                            className={`
                                                dark:bg-darkbgprimary mt-2 w-full text-sm py-3 rounded transition-all duration-150`}
                                        >
                                            Público
                                        </button>
                                    </div>
                                    <div className="grid w-full">
                                        <label
                                            className="ml-1 text-start text-xs"
                                            htmlFor="category"
                                        >
                                            Proyecto Proveedor
                                        </label>
                                        <button
                                            type="button"
                                            style={{
                                                backgroundColor:
                                                    providerProject &&
                                                    project.color_one,
                                            }}
                                            onClick={() =>
                                                setProviderProject(
                                                    !providerProject
                                                )
                                            }
                                            className={` dark:bg-darkbgprimary mt-2 w-full text-sm py-3 rounded transition-all duration-150`}
                                        >
                                            Proveedor
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <button
                        style={{
                            backgroundColor: project.color_one,
                        }}
                        className="absolute bottom-0 py-3 opacity-30 hover:opacity-100 duration-150 transition-color text-center w-full rounded-b-md"
                    >
                        Editar Proyecto
                    </button>
                </div>
                {/*  TEAM */}
                <div className="relative bg-lightbgunder dark:bg-darkbgunder p-2 rounded">
                    <h3 className="text-center text-sm">
                        Miembros de {project.name}
                    </h3>
                    {/* Actions */}
                    <div className="absolute bottom-3 flex justify-center w-full">
                        <div
                            className={` bg-lightbgunder dark:bg-darkbgprimary z-30 py-4 px-3 rounded-md shadow-lg  transition-all duration-200`}
                        >
                            {/* Searcher */}
                            <div className="flex justify-end tablet:justify-center gap-1 mobilXL:gap-2 items-center">
                                <div className=" bg-lightbgprimary dark:text-textdarkprimary text-textlightprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbgunder dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                                    <input
                                        className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 tablet:w-72  py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                        type="text"
                                        name="search"
                                        id="search"
                                        placeholder="Buscar nombre, rol, id..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                    <button>
                                        <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                                            <img
                                                className="w-3 tablet:w-4 opacity-60 group-hover:opacity-100 dark:invert transition-all duration-150"
                                                src={searchIcon}
                                                alt=""
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-1 h-[calc(100vh-255px)] tablet:h-[calc(100vh-240px)] first-letter: overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
                        {project.members.map((user: any) => {
                            return (
                                <TeamTableBody
                                    key={user.member._id}
                                    user={user}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectConfig;
