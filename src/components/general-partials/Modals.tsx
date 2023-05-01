import { useSelector } from "react-redux";
// Modals
import ProfileItemModal from "../project/Inventory/ProfileProductModal";
import AddItemModal from "../project/Inventory/AddProductModal";
import AddServiceModal from "../project/Services/AddServiceModal";
import AddClientModal from "../project/Clients/AddClientModal";
import SpentModal from "../project/Spent/SpentModal";
import SaleModal from "../project/Sale/SaleModal";

/* let modalInstance: typeof ProfileItemModal;
export function generateModal(modal: typeof ProfileItemModal) {
    console.log("llego", modal);
    modalInstance = modal;
} */

function Modals() {
    /*     return modalInstance != null; */
    const itemProfile = useSelector((state: any) => state.itemProfile);
    const openModal = useSelector((state: any) => state.modals);

    return (
        <>
            {itemProfile && (
                <div className="z-50">
                    <ProfileItemModal />
                </div>
            )}
            {openModal === "addItem" && (
                <div className="z-50">
                    <AddItemModal />
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
            {openModal === "spentModal" && (
                <div className="z-50">
                    <SpentModal />
                </div>
            )}
            {openModal === "saleModal" && (
                <div className="z-50">
                    <SaleModal />
                </div>
            )}
        </>
    );
}

export default Modals;
