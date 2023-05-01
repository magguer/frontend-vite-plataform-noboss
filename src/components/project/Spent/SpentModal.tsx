// Dependencies
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Types
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
// Components
import Spinner from "../../general-partials/Spinner";
import ModalLayout from "../../../layouts/ModalLayout";
//Redux
import { close } from "../../../redux/modalsReducer";
import { addMovement } from "../../../redux/movementsReducer";

export default function SpentModal() {
    const dispatch = useDispatch();
    const user = useSelector((state: UserType) => state.user);
    const project = useSelector((state: ProjectType) => state.project);
    const [sendData, setSendData] = useState(false);
    const [page, setPage] = useState(1);
    const [amount, setAmount] = useState<string>();
    const [reason, setReason] = useState<string>();
    const type = "spent";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSendData(true);
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/movement`,
            data: { amount, reason, type, project: project.id },
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        setSendData(false);
        dispatch(addMovement(response.data));
        dispatch(close(null));
    };

    return (
        <>
            <ModalLayout exit={() => dispatch(close(null))}>
                {/*    Form Add Product */}
                <div className="bg-lightbgprimary dark:bg-darkbgprimary rounded p-5 tablet:p-10">
                    <form
                        onSubmit={handleSubmit}
                        className="grid tablet:flex tablet:gap-3 justify-center w-full"
                    >
                        {/*          ADD INFO PRODUCTS */}
                        <div>
                            <div>
                                <div className="px-2">
                                    {/*          IMAGES & DESCRIPTION FOR PRODUCTS */}
                                    {page === 1 && (
                                        <div className="grid items-center gap-5 w-full mobilXL:w-[380px] fade-in-right">
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
                                                    <h3 className="text-lg tablet:text-xl font-semibold text-red-900">
                                                        Registro de Gasto
                                                    </h3>
                                                    <h3 className="tablet:text-center text-sm tablet:text-base ">
                                                        Información del
                                                        movimiento:
                                                    </h3>
                                                </div>
                                            </div>
                                            {/*   Form Page 2 */}
                                            <div className="grid gap-5 bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                                                <div className="w-full flex justify-between gap-2">
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start mb-1 text-text text-sm"
                                                            htmlFor="model"
                                                        >
                                                            Cantidad ($) *
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="number"
                                                            placeholder="Ej: 100"
                                                            required
                                                            name="amount"
                                                            id="amount"
                                                            value={amount}
                                                            onChange={(e) =>
                                                                setAmount(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid gap-1 w-full">
                                                    <label
                                                        className="ml-1 text-start text-sm  mb-1"
                                                        htmlFor="description"
                                                    >
                                                        Motivo *
                                                    </label>
                                                    <textarea
                                                        className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded"
                                                        name="description"
                                                        placeholder="Ej: Carga de Nafta"
                                                        id="description"
                                                        value={reason}
                                                        onChange={(e) =>
                                                            setReason(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {/*   Buttons Page 2 */}
                                            <div className="flex gap-3 mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        dispatch(close(null))
                                                    }
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
                                                    Salir
                                                </button>
                                                <button className="w-full flex justify-center items-center gap-2  bg-red-900 bg-opacity-30 hover:bg-opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150">
                                                    {sendData && <Spinner />}
                                                    <div className="flex items-center gap-4">
                                                        Registrar
                                                        <img
                                                            className="w-5 object-contain"
                                                            src={`${
                                                                import.meta.env
                                                                    .VITE_SUPABASE_BUCKET_URL
                                                            }/noboss/icons/gasto-icon.png`}
                                                            alt="home-icon"
                                                        />
                                                    </div>
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
