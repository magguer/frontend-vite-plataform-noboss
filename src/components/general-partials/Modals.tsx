import { useSelector } from "react-redux";
import ProfileItemModal from "../project/Inventory/ProfileItemModal";
import AddItemModal from "../project/Inventory/AddItemModal";

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
        </>
    );
}

export default Modals;
