//Dependencies
import { useDispatch } from "react-redux";
//Reducer
import { item } from "../../../redux/itemProfileReducer";
//Components
import Spinner from "../../general-partials/Spinner";
//Assets
import editIcon from "../../../assets/images/icons/edit-icon.png";

function InventoryTableBody({
  product,
  project,
  setShowEditProduct,
  showEditProduct,
  setProduct,
  roleProject,
}: any) {
  const dispatch = useDispatch();

  const handleEditItem = () => {
    setShowEditProduct(true);
    setProduct(product);
  };

  return (
    <>
      <li
        style={{
          borderColor: `${project.color_one}`,
        }}
        className={`${
          product.stock === 0 && "bg-red-600 dark:bg-red-950"
        } fade-in-left flex items-center text-xs tablet:text-sm bg-lightbgprimary hover:bg-lightbgunder dark:bg-darkbgsecondary dark:hover:bg-darkbgunder cursor-pointer rounded px-2 py-1 transition-colors duration-150 z-40`}
      >
        <button
          onClick={() => dispatch(item(product))}
          className="flex w-full items-center"
        >
          <div className="flex w-[100px] tablet:w-[250px] items-center gap-3 tablet:gap-5">
            {product.images_url[0] ? (
              <img
                className="w-8 h-8 tablet:h-10 tablet:w-10 rounded object-  "
                src={`${
                  import.meta.env.VITE_SUPABASE_BUCKET_URL
                }/projects/products/${product.images_url[0]}`}
                alt=""
              />
            ) : (
              <Spinner />
            )}
            <div className="text-start">
              <h3 className="w-[80px] mobilL:w-[150px] mobilXL:w-[210px] text-textlightprimary dark:text-textdarkprimary truncate">
                {product.model}
              </h3>
            </div>
          </div>
          <div className="flex items-center w-full justify-end tablet:justify-around">
            {!showEditProduct && (
              <div className="hidden mobilL:block">
                <h3 className="w-[50px] mobilXL:w-[70px] text-xs text-center text-textlightterceary dark:text-textdarkterceary truncate">
                  {product.sub_category.name}
                </h3>
              </div>
            )}
            <div>
              <h3 className="w-[70px] mobilXL:w-[50px] text-xs text-center text-textlightterceary dark:text-textdarkterceary truncate">
                $ {product.price}
              </h3>
            </div>
            {!showEditProduct && (
              <div className="hidden mobilXL:block">
                <h3 className="w-[50px] mobilXL:w-[50px] text-xs text-center text-textlightterceary dark:text-textdarkterceary truncate">
                  {product.sales_quantity} vts
                </h3>
              </div>
            )}
            {!showEditProduct && (
              <div>
                <h3
                  className={`
                                    ${
                                      product.stock <= 4 &&
                                      "text-red-400 dark:text-red-700"
                                    } 
                                    w-[30px] mobilXL:w-[50px] text-xs text-center text-textlightterceary dark:text-textdarkterceary truncate mr-3 tablet:mr-0`}
                >
                  {product.stock} uni
                </h3>
              </div>
            )}
          </div>
        </button>
        {roleProject.matriz.editProduct && (
          <button
            onClick={handleEditItem}
            className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonhoverprimary dark:hover:bg-darkbgprimary dark:focus:ring-darkbuttonringprimary relative p-3 z-50 rounded-lg "
          >
            <img
              className="w-3 tablet:w-4 h-3 object-contain invert dark:invert-0"
              src={editIcon}
              alt=""
            />
          </button>
        )}
      </li>
    </>
  );
}

export default InventoryTableBody;
