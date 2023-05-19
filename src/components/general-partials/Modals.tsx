//Dependencies
import { useDispatch, useSelector } from "react-redux";
//Redux
import { close } from "../../redux/modalsReducer";
import { item } from "../../redux/itemProfileReducer";
// Modals
import ProfileItemModal from "../project/Inventory/ProfileProductModal";
import AddItemModal from "../project/Inventory/AddProductModal";
import AddServiceModal from "../project/Services/AddServiceModal";
import AddClientModal from "../project/Clients/AddClientModal";
import SpentModal from "../project/Spent/SpentModal";
import AddProjectModal from "../project/Project/AddProjectModal";
import AddCategoryModal from "../project/Inventory/AddCategoryModal";
import IncomeModal from "../project/Income/IncomeModal";

/* let modalInstance: typeof ProfileItemModal;
export function generateModal(modal: typeof ProfileItemModal) {
    console.log("llego", modal);
    modalInstance = modal;
} */

function Modals() {
    /*     return modalInstance != null; */
    const dispatch = useDispatch();
    const itemProfile = useSelector((state: any) => state.itemProfile);
    const openModal = useSelector((state: any) => state.modals);

    /*   Close with ESC Function */
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            dispatch(close(null));
            dispatch(item(null));
        }
    });

    return (
        <>
            {itemProfile && (
                <div className="z-50">
                    <ProfileItemModal />
                </div>
            )}
            {openModal === "addProject" && (
                <div className="z-50">
                    <AddProjectModal />
                </div>
            )}
            {openModal === "addItem" && (
                <div className="z-50">
                    <AddItemModal />
                </div>
            )}
            {openModal === "addCategory" && (
                <div className="z-50">
                    <AddCategoryModal />
                </div>
            )}
            {openModal === "addServices" && (
                <div className="z-50">
                    <AddServiceModal />
                </div>
            )}
            {openModal === "addClient" && (
                <div className="z-50">
                    <AddClientModal />
                </div>
            )}
            {openModal === "incomeModal" && (
                <div className="z-50">
                    <IncomeModal />
                </div>
            )}
            {openModal === "spentModal" && (
                <div className="z-50">
                    <SpentModal />
                </div>
            )}
        </>
    );
}

export default Modals;
