import { useSelector } from "react-redux";
import ProfileItemModal from "../project/Inventory/ProfileItemModal";
import AddItemModal from "../project/Inventory/AddItemModal";
import AddServiceModal from "../project/Services/AddServiceModal";
import AddClientModal from "../project/Clients/AddClientModal";

function Modals() {
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
        </>
    );
}

export default Modals;
