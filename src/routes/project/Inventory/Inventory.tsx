//Dependencies
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
//Redux
import {
  addProductsList,
  getProductsList,
} from "../../../redux/productsReducer";
import { open } from "../../../redux/modalsReducer";
//Types
import { ProjectType } from "../../../types/ProjectTypes";
import { ProductsType } from "../../../types/ProductsType";
import { Product } from "../../../types/ProductTypes";
import { UserType } from "../../../types/UserTypes";
//Components
import InventoryTableBody from "../../../components/project/Inventory/InventoryTableBody";
import EditProductInventory from "../../../components/project/Inventory/EditProductInventory";
//Assets
import noboxIcon from "../../../assets/images/icons/nobox-icon.png";
import searchIcon from "../../../assets/images/icons/search-icon.png";

function Inventory() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [search, setSearch] = useState("");
  const [showEditProduct, setShowEditProduct] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const user = useSelector((state: UserType) => state.user);
  const roleProject = useSelector((state: any) => state.roleProject);
  const project = useSelector((state: ProjectType) => state.project);
  const products = useSelector((state: ProductsType) => state.products);

  //GetProducts
  const getProducts = async () => {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL}/products`,
      method: "get",
      params: {
        project: project._id,
        search: search ? search : undefined,
        offset,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (offset === 0) {
      dispatch(getProductsList(response.data));
    } else {
      dispatch(addProductsList(response.data));
    }

    if (offset !== 0 && response.data.length < 10) {
      setHasMore(false);
    }
  };

  //IfHasMore
  useEffect(() => {
    if (hasMore && !search) {
      getProducts();
    }

    let delay = setTimeout(() => {
      if (search) {
        setOffset(0);
        setHasMore(true);
        getProducts();
      }
    }, 250);

    return () => {
      clearTimeout(delay);
    };
  }, [project, offset, search]);

  const handleOnSearch = (e) => {
    setSearch(e.target.value);
  };

  console.log(offset);

  //ScrollDetector
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (isAtBottom && hasMore) {
      setOffset((prevOffset) => prevOffset + 10);
    }
  };

  return (
    <>
      <div className="fade-in-left">
        <div className="w-full flex">
          <div
            className={`${
              showEditProduct ? "w-full laptop:w-6/12" : "w-full"
            } relative transition-all duration-300`}
          >
            {/* Actions */}
            <div className="absolute bottom-2 flex justify-center w-full">
              <div
                className={`relative bg-lightbgunder backdrop-blur-md bg-opacity-50 dark:bg-opacity-50 dark:bg-darkbgprimary z-30 py-4 px-3 rounded-md shadow-lg  transition-all duration-200`}
              >
                {/* Searcher */}
                <div className="flex justify-end tablet:justify-center gap-1 mobilXL:gap-2 items-center">
                  <div className=" bg-lightbgprimary dark:text-textdarkprimary text-textlightprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbgunder buttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                    <input
                      className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 laptop:w-96 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Buscar producto, categoria, sku..."
                      value={search}
                      onChange={handleOnSearch}
                    />
                    <button>
                      <div className="group text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                        <img
                          className="w-3 tablet:w-4 opacity-60 group-hover:opacity-100 dark:invert transition-all duration-150"
                          src={searchIcon}
                          alt=""
                        />
                      </div>
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(open("addItem"))}
                    className="dark:text-textdarkprimary text-textlightprimary bg-lightbgprimary hover:bg-lightbgunder focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbgsecondary dark:bg-darkbgunder dark:focus:ring-darkbuttonringprimary h-full px-3 tablet:px-4 py-1 text-lg rounded-lg transition-all duration-150"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            {/* Products List */}
            {products?.length !== 0 ? (
              <>
                <div className="flex w-full">
                  <ul
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex w-full flex-col gap-1 h-[calc(100dvh-180px)] tablet:h-[calc(100dvh-205px)] overflow-auto scrollbar-none"
                  >
                    {products?.map((product: any) => {
                      return (
                        <div key={product._id}>
                          <InventoryTableBody
                            roleProject={roleProject}
                            product={product}
                            project={project}
                            setShowEditProduct={setShowEditProduct}
                            showEditProduct={showEditProduct}
                            setProduct={setProduct}
                          />
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </>
            ) : (
              <div className="h-[calc(100vh-243px)] tablet:h-[calc(100vh-269px)] flex flex-col items-center mt-16 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
                <img
                  className="w-20 laptop:w-32 invert dark:invert-0"
                  src={noboxIcon}
                  alt=""
                />
                <h3>No hay productos registrados.</h3>
              </div>
            )}
          </div>
          {showEditProduct ? (
            <div
              className={`absolute laptop:relative z-50 ${
                showEditProduct
                  ? "left-[0px] opacity-100 w-full laptop:w-6/12"
                  : "left-[300px] opacity-0 "
              } transition-all duration-200`}
            >
              <EditProductInventory
                product={product}
                setShowEditProduct={setShowEditProduct}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Inventory;
