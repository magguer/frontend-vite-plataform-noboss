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
    setShowEditItem,
    showEditItem,
    setProduct,
}: any) {
    const dispatch = useDispatch();

    const handleEditItem = () => {
        setShowEditItem(true);
        setProduct(product);
    };

    return (
        <>
            <li className="fade-in-left flex items-center text-xs tablet:text-sm bg-lightbgprimary hover:bg-lightbgunder dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150 z-40">
                <button
                    onClick={() => dispatch(item(product))}
                    className="flex w-full items-center pr-1"
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
                        {!showEditItem && (
                            <div className="hidden mobilL:block">
                                <h3 className="w-[50px] mobilXL:w-[70px] text-xs text-center text-textlightterceary dark:text-textdarkterceary truncate">
                                    {product.sub_category.name}
                                </h3>
                            </div>
                        )}
                        <div>
                            <h3 className="w-[50px] mobilXL:w-[50px] text-xs text-center text-textlightterceary dark:text-textdarkterceary truncate">
                                $ {product.price}
                            </h3>
                        </div>
                        {!showEditItem && (
                            <div className="hidden mobilXL:block">
                                <h3 className="w-[50px] mobilXL:w-[50px] text-xs text-center text-textlightterceary dark:text-textdarkterceary truncate">
                                    $ {product.cost}
                                </h3>
                            </div>
                        )}
                        {!showEditItem && (
                            <div>
                                <h3 className="w-[30px] mobilXL:w-[50px] text-xs text-center text-textlightterceary dark:text-textdarkterceary truncate">
                                    {product.stock} u
                                </h3>
                            </div>
                        )}
                    </div>
                </button>
                <button
                    onClick={handleEditItem}
                    className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary relative px-3 py-2 z-50 rounded-lg "
                >
                    <img
                        className="w-3 tablet:w-4 object-contain invert dark:invert-0"
                        src={editIcon}
                        alt=""
                    />
                </button>
            </li>
        </>
    );
}

export default InventoryTableBody;
