//Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy } from "react";
//Redux
import { close } from "../../redux/modalsReducer";
import { item } from "../../redux/itemProfileReducer";
import AccesssProjectModal from "../project/Project/AccessProjectModal";
// Modals
const ProfileItemModal = lazy(
  () => import("../project/Inventory/ProfileProductModal")
);
const AddItemModal = lazy(() => import("../project/Inventory/AddProductModal"));
const AddServiceModal = lazy(
  () => import("../project/Services/AddServiceModal")
);
const AddClientModal = lazy(() => import("../project/Clients/AddClientModal"));
const SpentModal = lazy(() => import("../project/Spent/SpentModal"));
const AddProjectModal = lazy(
  () => import("../project/Project/AddProjectModal")
);
const AddCategoryModal = lazy(
  () => import("../project/Category/AddCategoryModal")
);
const IncomeModal = lazy(() => import("../project/Income/IncomeModal"));
const AddBookingModal = lazy(() => import("../project/Diary/AddBookingModal"));

function Modals() {
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
        <Suspense>
          <div className="z-50">
            <ProfileItemModal />
          </div>
        </Suspense>
      )}
      {openModal === "addProject" && (
        <Suspense>
          <div className="z-50">
            <AddProjectModal />
          </div>
        </Suspense>
      )}
      {openModal === "accessProject" && (
        <Suspense>
          <div className="z-50">
            <AccesssProjectModal />
          </div>
        </Suspense>
      )}
      {openModal === "addItem" && (
        <Suspense>
          <div className="z-50">
            <AddItemModal />
          </div>
        </Suspense>
      )}
      {openModal === "addCategory" && (
        <Suspense>
          <div className="z-50">
            <AddCategoryModal />
          </div>
        </Suspense>
      )}
      {openModal === "addService" && (
        <Suspense>
          <div className="z-50">
            <AddServiceModal />
          </div>
        </Suspense>
      )}
      {openModal === "addClient" && (
        <Suspense>
          <div className="z-50">
            <AddClientModal />
          </div>
        </Suspense>
      )}
      {openModal === "incomeModal" && (
        <Suspense>
          <div className="z-50">
            <IncomeModal />
          </div>
        </Suspense>
      )}
      {openModal === "spentModal" && (
        <Suspense>
          <div className="z-50">
            <SpentModal />
          </div>
        </Suspense>
      )}
      {openModal === "addBookingModal" && (
        <Suspense>
          <div className="z-50">
            <AddBookingModal />
          </div>
        </Suspense>
      )}
    </>
  );
}

export default Modals;
