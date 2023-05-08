// Dependencies
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Types
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
// Components
import Spinner from "../../general-partials/Spinner";
import ModalLayout from "../../../layouts/ModalLayout";
//Redux
import { close } from "../../../redux/modalsReducer";
import { addProject } from "../../../redux/projectsReducer";
//Assets
import proyectosicon from "../../../assets/images/icons/Proyectos.png";

export default function AddProjectModal() {
    const dispatch = useDispatch();
    const user = useSelector((state: UserType) => state.user);
    const [sendData, setSendData] = useState(false);
    const [page, setPage] = useState(1);
    const [logo_url, setLogo_url] = useState<string>();
    const [name, setName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [services, setServices] = useState<boolean>(false);
    const [products, setProducts] = useState<boolean>(false);
    const [heading, setHeading] = useState<string>();

    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        const getHeadings = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/heading`,
                method: "get",
            });
            setHeadings(response.data);
        };
        getHeadings();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSendData(true);
        const formData = new FormData();
        formData.append("name", name as any);
        formData.append("password", password as any);
        formData.append("logo_url", logo_url as any);
        formData.append("heading", heading as any);
        formData.append("services", services as any);
        formData.append("products", products as any);
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/project`,
            data: formData,
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response.data);
        setSendData(false);
        dispatch(addProject(response.data));
        dispatch(close(null));
    };

    return (
        <>
            <ModalLayout exit={() => dispatch(close(null))}>
                {/*    Form Add Product */}
                <div className="bg-lightbgprimary dark:bg-darkbgprimary rounded p-5">
                    <form
                        onSubmit={handleSubmit}
                        className="grid tablet:flex tablet:gap-3 justify-center w-full"
                    >
                        {/*          ADD INFO PROJECT */}
                        <div>
                            {/*   Header Page 1 */}
                            <div className="flex justify-center items-center gap-5 mb-4">
                                <div className="flex flex-col text-center items-center">
                                    <h3 className="text-xs text-textprimary">
                                        <em>CREADOR DE</em>
                                    </h3>
                                    <img
                                        className="w-40"
                                        src={proyectosicon}
                                        alt=""
                                    />
                                    <h3 className="text-xs">
                                        <span className="text-secondarycolor">
                                            {" "}
                                            Creá tu proyecto
                                        </span>{" "}
                                        y empezá a gestionarlo.
                                    </h3>
                                </div>
                            </div>
                            <div className="px-2">
                                {/*         BASIC INFO PRODUCT FOR PRODUCTS */}
                                {page === 1 && (
                                    <div className="grid gap-5 w-full mobilXL:w-[380px] fade-in-right">
                                        {/*   Form Page 1 */}
                                        <div className="bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                                            <div className="w-full flex flex-col justify-between gap-5">
                                                <div className="flex flex-col gap-2 w-full items-end">
                                                    {/* Name of Project */}
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start text-xs"
                                                            htmlFor="name"
                                                        >
                                                            Nombre del Proyecto
                                                            *
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="text"
                                                            placeholder=""
                                                            required
                                                            name="name"
                                                            id="name"
                                                            value={name}
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    {/* Password of Project */}
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start text-xs"
                                                            htmlFor="password"
                                                        >
                                                            Contraseña del
                                                            Proyecto
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="password"
                                                            placeholder=""
                                                            required
                                                            name="password"
                                                            id="password"
                                                            value={password}
                                                            onChange={(e) =>
                                                                setPassword(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    {/* Logo of Project */}
                                                    <div className="w-full items-center flex justify-center gap-5 mt-3">
                                                        <div className="relative gap-1">
                                                            <input
                                                                onChange={(
                                                                    e: any
                                                                ) => {
                                                                    setLogo_url(
                                                                        e.target
                                                                            .files[0]
                                                                    );
                                                                }}
                                                                className="absolute opacity-0 inset-0 w-[200px] h-[40px] z-40"
                                                                type="file"
                                                                name="image"
                                                                id="image"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="bg-lightbgprimary dark:bg-darkbgprimary w-full px-5 items-center gap-5 py-3 flex rounded-md text-xs"
                                                            >
                                                                <h3>
                                                                    Selecciona
                                                                    un Logo
                                                                </h3>
                                                            </button>
                                                        </div>
                                                        <div className="bg-darkbgprimary grid place-content-center rounded-full w-16 h-16">
                                                            <img
                                                                className="w-6 object-contain invert"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_SUPABASE_BUCKET_URL
                                                                }/noboss/icons/camera-icon.png`}
                                                                alt="camera-icon"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*   Buttons Page 1 */}
                                        <div className="flex gap-3 mt-2 tablet:mt-4">
                                            <button
                                                onClick={() =>
                                                    dispatch(close(null))
                                                }
                                                type="button"
                                                className="w-full text-center  bg-lightbgsecondary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary hover:bg-lightbuttonprimary rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                            >
                                                Salir
                                            </button>
                                            <button
                                                onClick={() => setPage(2)}
                                                className="w-full flex items-center justify-center gap-5 bg-secondarycolor bg-opacity-30 hover:bg-opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                            >
                                                Siguiente
                                                <img
                                                    className="w-3 object-contain -rotate-90"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SUPABASE_BUCKET_URL
                                                    }/noboss/icons/arrow-down-icon.png`}
                                                    alt="home-icon"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/*          IMAGES & DESCRIPTION FOR PRODUCTS */}
                                {page === 2 && (
                                    <div className="grid items-center gap-5 w-full mobilXL:w-[380px] fade-in-right">
                                        {/*   Form Page 2 */}
                                        <div className="grid gap-5 bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                                            {/*        Services_On, Products_On */}
                                            <div className="grid justify-center">
                                                <h3 className="mb-3">
                                                    Nos dedicamos a:
                                                </h3>
                                                <div className="flex items-center gap-5">
                                                    <input
                                                        onChange={(e: any) =>
                                                            setProducts(
                                                                !products
                                                            )
                                                        }
                                                        type="checkbox"
                                                        name="products"
                                                        id="products"
                                                    />
                                                    <label htmlFor="products">
                                                        Comerciar productos
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                    <input
                                                        onChange={(e: any) =>
                                                            setServices(
                                                                !services
                                                            )
                                                        }
                                                        type="checkbox"
                                                        name="services"
                                                        id="services"
                                                    />
                                                    <label htmlFor="services">
                                                        Realizar servicios
                                                    </label>
                                                </div>
                                            </div>

                                            {/*     Rubro */}
                                            <div className="grid gap-1 w-full">
                                                <label
                                                    className="ml-1 text-start text-xs"
                                                    htmlFor="category"
                                                >
                                                    De...
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500">
                                                        <select
                                                            className="text-sm w-full border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                                            name="heading"
                                                            id="heading"
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setHeading(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {headings.map(
                                                                (
                                                                    heading: any
                                                                ) => {
                                                                    return (
                                                                        <option
                                                                            value={
                                                                                heading.slug
                                                                            }
                                                                            key={
                                                                                heading._id
                                                                            }
                                                                        >
                                                                            {
                                                                                heading.name
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>

                                                    <button className="bg-lightbgprimary dark:bg-darkbgprimary w-[80px] mb-0.5 py-1 h-full rounded-md text-xs">
                                                        Sugerir
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/*   Buttons Page 2 */}
                                        <div className="flex gap-3 mt-1 tablet:mt-4">
                                            <button
                                                type="button"
                                                onClick={() => setPage(1)}
                                                className="w-full bg-lightbgsecondary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary hover:bg-lightbuttonprimary flex gap-5 items-center justify-center rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                            >
                                                <img
                                                    className="w-3 object-contain rotate-90"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SUPABASE_BUCKET_URL
                                                    }/noboss/icons/arrow-down-icon.png`}
                                                    alt="home-icon"
                                                />
                                                Volver
                                            </button>
                                            <button className="w-full flex items-center justify-center text-center bg-secondarycolor bg-opacity-30 hover:bg-opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150">
                                                {sendData && (
                                                    <div>
                                                        <Spinner />
                                                    </div>
                                                )}
                                                Finalizar
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/*          BUSSINES INFO FOR PRODUCTS */}
                            </div>
                        </div>
                    </form>
                </div>
            </ModalLayout>
        </>
    );
}
