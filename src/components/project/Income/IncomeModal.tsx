// Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// Types
import { ProjectType } from "../../../types/ProjectTypes";
// Components
import ModalLayout from "../../../layouts/ModalLayout";
//Redux
import { close } from "../../../redux/modalsReducer";
//Assets
import infoIcon from "../../../assets/images/icons/info-icon.png";

export default function IncomeModal() {
    const dispatch = useDispatch();
    const project = useSelector((state: ProjectType) => state.project);

    return (
        <>
            <ModalLayout exit={() => dispatch(close(null))}>
                <div className="bg-lightbgprimary dark:bg-darkbgprimary text-textlightprimary dark:text-textdarkprimary rounded p-5 tablet:p-10">
                    <div className="fade-in-right text-textlightprimary dark:text-textdarkprimary">
                        {/*   Header */}
                        <div className="flex items-center gap-5 justify-center">
                            <img
                                className="w-14 rounded-full"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/logos/${project.logo_url}`}
                                alt=""
                            />
                            <div className="justify-center text-start grid">
                                <h3
                                    style={{ color: project.color_one }}
                                    className="text-lg tablet:text-xl font-semibold"
                                >
                                    Registro de Ingreso
                                </h3>
                                <h3 className="tablet:text-center text-sm tablet:text-base ">
                                    Selecciona la opción que necesitas:
                                </h3>
                            </div>
                        </div>
                        {/*   Options */}
                        <div className="flex justify-center mt-7 gap-3 text-base tablet:text-lg">
                            <Link
                                onClick={() => dispatch(close(null))}
                                className="bg-lightbgsecondary dark:bg-darkbgsecondary px-8 py-6 text-center rounded"
                                to={"/venta"}
                            >
                                Venta / Encargo
                            </Link>
                            <Link
                                onClick={() => dispatch(close(null))}
                                className="bg-lightbgsecondary dark:bg-darkbgsecondary px-8 py-6 text-center rounded"
                                to={"/venta"}
                            >
                                Pago / Inversión
                            </Link>
                        </div>
                        {/*   Footer */}
                        <div className="mt-7 text-[8px] flex items-center justify-center gap-2">
                            <h3>Más Información</h3>
                            <img
                                src={infoIcon}
                                alt=""
                                className="dark:invert w-3"
                            />
                        </div>
                    </div>
                </div>
            </ModalLayout>
        </>
    );
}
