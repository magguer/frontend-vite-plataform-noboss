// Dependencies
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Types
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
import Spinner from "../../general-partials/Spinner";
import ModalLayout from "../../../layouts/ModalLayout";
// Redux
import { close } from "../../../redux/modalsReducer";
import { addClient } from "../../../redux/clientsReducer";

export default function AddItemModal() {
    const dispatch = useDispatch();
    const user = useSelector((state: UserType) => state.user);
    const project = useSelector((state: ProjectType) => state.project);
    const [sendData, setSendData] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [name, setName] = useState<string>();
    const [type, setType] = useState<string>("Casual");
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSendData(true);
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/clients`,
            data: {
                name: name,
                type: type,
                email: email,
                phone: phone,
                project: project.slug,
            },
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch(addClient(response.data));
        setSendData(false);
        dispatch(close(null));
    };

    return (
        <>
            <ModalLayout exit={() => dispatch(close(null))}>
                {/*    Form Add client */}
                <div className="bg-lightbgprimary dark:bg-darkbgprimary rounded p-5 tablet:p-10">
                    <form
                        onSubmit={handleSubmit}
                        className="grid tablet:flex tablet:gap-3 justify-center w-full"
                    >
                        {/*          ADD INFO CLIENT */}
                        <div>
                            <div>
                                <div className="px-2">
                                    {/*         BASIC INFO FOR CLIENT */}
                                    {page === 1 && (
                                        <div className="grid gap-5 w-full mobilXL:w-[380px] fade-in-right">
                                            {/*   Header Page 1 */}
                                            <div className="flex items-center gap-5">
                                                <img
                                                    className="w-14 rounded-full"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SUPABASE_BUCKET_URL
                                                    }/projects/logos/${
                                                        project.logo_url
                                                    }`}
                                                    alt=""
                                                />
                                                <div className="flex flex-col text-start">
                                                    <h3 className="text-lg  tablet:text-xl font-semibold text-textsecondary">
                                                        Agregar un Cliente
                                                    </h3>
                                                    <h3 className="text-sm tablet:text-base">
                                                        Primero,
                                                        identifiquémoslo:
                                                    </h3>
                                                </div>
                                            </div>
                                            {/*   Form Page 1 */}
                                            <div className="bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                                                <div className="w-full flex flex-col justify-between gap-5">
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start text-sm  mb-1"
                                                            htmlFor="price"
                                                        >
                                                            Nombre completo *
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="text"
                                                            placeholder="Ej: Juan Martinez"
                                                            name="name"
                                                            id="name"
                                                            value={name}
                                                            onChange={(e) =>
                                                                setName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1  text-start text-sm mb-1"
                                                            htmlFor="sub_category"
                                                        >
                                                            Tipo de cliente *
                                                        </label>
                                                        <div className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500">
                                                            <select
                                                                className="text-sm w-full border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                                name="sub_category"
                                                                id="sub_category"
                                                                onChange={(e) =>
                                                                    setType(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                <option value="Casual">
                                                                    Casual
                                                                </option>
                                                                <option value="Recurrente">
                                                                    Recurrente
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*   Buttons Page 1 */}
                                            <div className="flex gap-3 mt-3 tablet:mt-7">
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

                                    {/*          BUSSINES INFO FOR CLIENT */}
                                    {page === 2 && (
                                        <div className="w-full grid justify-between gap-5 mobilXL:w-[380px] fade-in-right">
                                            {/*   Header Page 2 */}
                                            <div className="flex items-center gap-5">
                                                <img
                                                    className="w-14 rounded-full"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SUPABASE_BUCKET_URL
                                                    }/projects/logos/${
                                                        project.logo_url
                                                    }`}
                                                    alt=""
                                                />
                                                <div className="justify-center text-start grid">
                                                    <h3 className="text-lg tablet:text-xl font-semibold text-textsecondary">
                                                        Ya queda poco!
                                                    </h3>
                                                    <h3 className="tablet:ext-center text-sm tablet:text-base ">
                                                        Por útlimo, info de
                                                        contacto:
                                                    </h3>
                                                </div>
                                            </div>
                                            {/*   Form Page 2 */}
                                            <div className="grid gap-5 bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                                                <div className="flex gap-3">
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start text-sm  mb-1"
                                                            htmlFor="cost"
                                                        >
                                                            Email
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="text"
                                                            name="email"
                                                            placeholder="Ej: juanmartinez@..."
                                                            id="email"
                                                            value={email}
                                                            onChange={(e) =>
                                                                setEmail(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start text-sm  mb-1"
                                                            htmlFor="name"
                                                        >
                                                            Phone
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="text"
                                                            name="phone"
                                                            placeholder="Ej: 092 683 ..."
                                                            id="phone"
                                                            value={phone}
                                                            onChange={(e) =>
                                                                setPhone(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="grid gap-1 w-full">
                                                    <label
                                                        className="ml-1 text-start text-sm  mb-1"
                                                        htmlFor="name"
                                                    >
                                                        Address
                                                    </label>
                                                    <input
                                                        className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                        type="text"
                                                        name="phone"
                                                        placeholder="092 683 ..."
                                                        id="phone"
                                                        value={phone}
                                                        onChange={(e) =>
                                                            setPhone(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div> */}
                                            </div>
                                            {/*   Buttons Page 3 */}
                                            <div className="flex gap-3 mt-3 tablet:mt-9">
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
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </ModalLayout>
        </>
    );
}
