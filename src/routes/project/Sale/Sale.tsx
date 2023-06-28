// Dependencies
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Types
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
import { Product } from "../../../types/ProductTypes";
import { ClientsType } from "../../../types/ClientsType";
import { Client } from "../../../types/ClientTypes";
// Components
import Spinner from "../../../components/general-partials/Spinner";
import ProductCartTableBody from "../../../components/project/Sale/ProductCartTableBody";
//Redux
import { close, open } from "../../../redux/modalsReducer";
import { getProductsList } from "../../../redux/productsReducer";
import { ProductsType } from "../../../types/ProductsType";
import {
  addCartProduct,
  removeCartEveryProducts,
} from "../../../redux/cartReducer";
import { getClientsList } from "../../../redux/clientsReducer";
// Assets
import marketimage from "../../../assets/images/no_market_image.svg";
import arrowIcon from "../../../assets/images/icons/arrow-down-icon.png";
import noboxIcon from "../../../assets/images/icons/nobox-icon.png";
import clientsIcon from "../../../assets/images/icons/clients-icon.png";
import userIcon from "../../../assets/images/icons/user-icon.png";
import payIcon from "../../../assets/images/icons/pay-icon.png";
import searchIcon from "../../../assets/images/icons/search-icon.png";

function Sale() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: UserType) => state.user);
  const project = useSelector((state: ProjectType) => state.project);
  const products = useSelector((state: ProductsType) => state.products);
  const clients = useSelector((state: ClientsType) => state.clients);
  const cart = useSelector((state: any) => state.cart);

  const [client, setClient] = useState<Client>();
  const [payMethod, setPayMethod] = useState<string>();
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [searchClient, setSearchClient] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/products/?project=${
          project._id
        }&search=${searchProduct}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(getProductsList(response.data));
    };
    getProducts();
  }, [project, searchProduct]);

  useEffect(() => {
    const getClients = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/clients/?project=${
          project._id
        }&search=${searchClient}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(getClientsList(response.data));
    };
    getClients();
  }, [project, searchClient]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (payMethod) {
      setLoading(true);
      await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/movement`,
        data: {
          amount: subTotalPrice(cart),
          type: "sale",
          reason: "Venta",
          project: project._id,
          client: client._id,
          cart,
          payMethod,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(removeCartEveryProducts());
      setLoading(false);
      navigate("/resumen");
    } else {
      ("");
    }
  };

  const handleAddProduct = (product: Product) => {
    if (
      cart.some((productCart: any) => productCart.product.slug === product.slug)
    ) {
      const productCart = cart.filter(
        (productCart: any) => productCart.product.slug === product.slug
      );
      dispatch(addCartProduct(productCart[0]));
    } else {
      dispatch(
        addCartProduct<any>({
          product: product,
          product_id: product.id,
          quantity: 1,
          fixed_price: product.price,
        })
      );
    }
  };

  function subTotalPrice(cart: any) {
    const prices = cart.map(
      (productCart: any) => productCart.product.price * productCart.quantity
    );
    let totalPrice = 0;
    for (let price of prices) {
      totalPrice += price;
    }
    return totalPrice;
  }

  return (
    <div>
      {/*    Form Add Sale */}
      <div className="text-textlightprimary dark:text-textdarkprimary mt-2 h-full rounded">
        <form
          onSubmit={handleSubmit}
          className="grid tablet:flex laptop:gap-3 justify-center w-full"
        >
          {/*  Body */}
          <div className="grid justify-center laptop:flex w-full gap-0 tablet:gap-4 rounded fade-in-right px-2 tablet:px-5 h-[calc(100vh-210px)] tablet:h-[calc(100vh-230px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgunder dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
            {/*   Products / Clients / Payment */}
            <div className="w-full laptop:w-6/12">
              {/*   Products   */}
              {page === 1 && (
                <div className="w-full fade-in-left">
                  {/* Searcher Products */}
                  <div className="flex justify-center gap-1 mobilXL:gap-2 items-center">
                    <div className="text-white bg-lightbgprimary hover:bg-lightbuttonsecondary  focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                      <input
                        className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Buscar producto, categoria, subcategoria..."
                        value={searchProduct}
                        onChange={(e) => setSearchProduct(e.target.value)}
                      />
                      <div>
                        <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                          <img
                            className="w-3 tablet:w-4 opacity-60 group-hover:opacity-100 dark:invert transition-all duration-150"
                            src={searchIcon}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch(open("addItem"))}
                      className="text-textterceary bg-lightbgprimary  hover:bg-lightbuttonsecondary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary h-full px-3 tablet:px-4 py-1 text-lg rounded-lg"
                    >
                      +
                    </button>
                  </div>
                  {/*   Form Page 1 Products */}
                  {products?.length !== 0 ? (
                    <div className="flex flex-wrap justify-center m-auto pt-4 gap-2 max-h-[calc(100vh-250px)] tablet:max-h-[calc(100vh-280px)]  overflow-auto scrollbar-thin scrollbar-thumb-lightbgunder dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                      {products?.map((product: any, i: any) => {
                        return (
                          <button
                            type="button"
                            className={`${
                              product.stock == 0 && "bg-red-800 dark:bg-red-800"
                            }  bg-lightbgprimary dark:bg-darkbgprimary rounded p-2 relative`}
                            onClick={() => handleAddProduct(product)}
                            key={i}
                          >
                            {product.images_url[0] ? (
                              <>
                                <div
                                  style={{
                                    backgroundColor: project.color_one,
                                  }}
                                  className="rounded absolute right-[-5px] top-[-8px] p-1"
                                >
                                  <h3 className="text-[10px] w-3 h-3">
                                    {product.stock}
                                  </h3>
                                </div>
                                <img
                                  className="w-8 tablet:w-16 h-8 tablet:h-16 rounded-sm object-contain"
                                  src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                  }/projects/products/${product.images_url[0]}`}
                                  alt=""
                                />

                                <h3 className="text-xs mt-1">
                                  ${product.price}
                                </h3>
                              </>
                            ) : (
                              <Spinner />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mt-10 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
                      <img
                        className="w-20 laptop:w-32 invert dark:invert-0"
                        src={noboxIcon}
                        alt=""
                      />
                      <h3>No hay productos registrados.</h3>
                    </div>
                  )}
                </div>
              )}
              {/*   Clients   */}
              {page === 2 && (
                <div className="fade-in-left">
                  {/* Searcher Clients */}
                  <div className="flex w-full justify-center gap-1 mobilXL:gap-2 items-center">
                    <div className="text-white bg-lightbgprimary hover:bg-lightbuttonsecondary  focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                      <input
                        className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Buscar cliente, nombre, teléfono..."
                        value={searchClient}
                        onChange={(e) => setSearchClient(e.target.value)}
                      />
                      <div>
                        <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                          <img
                            className="w-3 tablet:w-4 opacity-60 group-hover:opacity-100 dark:invert transition-all duration-150"
                            src={searchIcon}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch(open("addClient"))}
                      className="text-textterceary bg-lightbgprimary  hover:bg-lightbuttonsecondary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary h-full px-3 tablet:px-4 py-1 text-lg rounded-lg"
                    >
                      +
                    </button>
                  </div>
                  {/*   Form Page 2 Clients*/}
                  {clients?.length !== 0 ? (
                    <div className="flex flex-wrap justify-center m-auto mt-2 gap-2 max-h-[calc(100vh-250px)] tablet:max-h-[calc(100vh-300px)]  overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                      {clients?.map((client: any, i: any) => {
                        return (
                          <button
                            key={client._id}
                            type="button"
                            onClick={() => setClient(client)}
                            className="fade-in-left w-full flex items-center text-xs tablet:text-sm bg-lightbgprimary hover:bg-lightbgsecondary dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150 z-40"
                          >
                            <div className="flex w-full items-center pr-1">
                              <div className="flex items-center gap-5 text-start w-full">
                                <img
                                  className="w-8 h-8 object-cover p-1 bg-lightbgsecondary dark:bg-darkbgsecondary rounded-full"
                                  src={userIcon}
                                  alt=""
                                />
                                <h3 className="w-[150px] truncate text-xs tablet:text-sm font-medium">
                                  {client.name}
                                </h3>
                              </div>

                              <div className="hidden laptop:flex justify-center w-full">
                                <h3 className="w-[150px] truncate text-textterceary text-end text-xs font-medium">
                                  {client.type}
                                </h3>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mt-14 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
                      <img
                        className="w-16 laptop:w-28 invert dark:invert-0"
                        src={clientsIcon}
                        alt=""
                      />
                      <h3>No hay clientes registrados.</h3>
                    </div>
                  )}
                </div>
              )}
              {/*   Payment   */}
              {page === 3 && (
                <div className="fade-in-left">
                  <h3 className="text-center mt-2 mb-4">Metodo de Pago</h3>
                  {/*   Form Page 1 */}
                  <div className="flex flex-wrap justify-center m-auto items-center max-w-[300px] mobilXL:max-w-[500px] mt-1 gap-2 max-h-[calc(100vh-250px)] tablet:max-h-[calc(100vh-300px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgunder dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-3">
                    <div className="w-full flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setPayMethod("Efectvo")}
                        className="bg-lightbgprimary hover:bg-lightbgunder dark:bg-darkbgprimary dark:hover:bg-darkbgsecondary w-full py-7 transition-color duration-200"
                      >
                        Efectivo
                      </button>
                      <button
                        type="button"
                        onClick={() => setPayMethod("Tarjeta Débito/Crédito")}
                        className="bg-lightbgprimary hover:bg-lightbgunder dark:bg-darkbgprimary dark:hover:bg-darkbgsecondary w-full py-7 transition-color duration-200"
                      >
                        Tarjeta Débito/Crédito
                      </button>
                      <button
                        type="button"
                        onClick={() => setPayMethod("Transferencia")}
                        className="bg-lightbgprimary hover:bg-lightbgunder dark:bg-darkbgprimary dark:hover:bg-darkbgsecondary w-full py-7 transition-color duration-200"
                      >
                        Transferencia
                      </button>
                      <button
                        type="button"
                        onClick={() => setPayMethod("Cuotas")}
                        className="bg-lightbgprimary hover:bg-lightbgunder dark:bg-darkbgprimary dark:hover:bg-darkbgsecondary w-full py-7 transition-color duration-200"
                      >
                        Cuotas
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/*   Cart */}
            <div className="w-full laptop:w-6/12">
              {cart.length === 0 ? (
                <div className="grid place-content-center h-full m-auto w-full">
                  <img className="w-40 tablet:w-60" src={marketimage} alt="" />
                </div>
              ) : (
                <div className="relative flex flex-col m-auto gap-1 w-full">
                  <div className="tablet:flex text-center justify-center items-center gap-3">
                    <h3 className="text-sm">Registro de Venta</h3>
                    <button
                      type="button"
                      onClick={() => dispatch(removeCartEveryProducts())}
                      className="bg-lightbgprimary dark:bg-darkbgprimary px-2 py-1 rounded text-xs"
                    >
                      Vaciar
                    </button>
                  </div>
                  {/*   Cart   */}
                  <div className="flex flex-col gap-1 h-[calc(100vh-250px)] tablet:h-[calc(100vh-340px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgunder dark:scrollbar-thumb-darkbgunder scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded tablet:pr-2 pb-10">
                    {cart.map((productCart: any, i: any) => {
                      return (
                        <ProductCartTableBody
                          key={i}
                          productCart={productCart}
                          project={project}
                        />
                      );
                    })}
                    {/*   Summary */}
                    <div className="absolute left-0 bottom-16 w-full">
                      <div className="flex justify-around items-center w-full">
                        <div
                          className={`bg-lightbgunder dark:bg-darkbgprimary w-full h-[35px] rounded-s px-4 py-2 transition-all duration-100 flex gap-2 items-center text-xs ml-4 shadow-lg`}
                        >
                          <img
                            className="w-5 invert dark:invert-0"
                            src={clientsIcon}
                            alt=""
                          />
                          {client && (
                            <h3 className="fade-in-left w-[100px] truncate">
                              {client.name}
                            </h3>
                          )}
                        </div>
                        <div
                          style={{
                            backgroundColor: `${project.color_one}`,
                          }}
                          className=" bottom-[-4px] cursor-default rounded shadow-lg px-5 py-3"
                        >
                          <h3>${subTotalPrice(cart).toFixed(2)}</h3>
                        </div>
                        <div
                          className={`bg-lightbgunder dark:bg-darkbgprimary w-full h-[35px] rounded-e transition-all duration-100 flex gap-2 items-center justify-end px-4 py-2 text-xs mr-4 shadow-lg`}
                        >
                          {payMethod && (
                            <h3 className="fade-in-right w-[100px] truncate text-end">
                              {payMethod}
                            </h3>
                          )}

                          <img
                            className="w-5 invert dark:invert-0"
                            src={payIcon}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*   Buttons */}
                  <div className="flex gap-3 justify-center mt-2 text-xs tablet:text-base">
                    {page === 1 && (
                      <button
                        type="button"
                        disabled={cart.length === 0 ? true : false}
                        style={{
                          backgroundColor: `${project.color_one}`,
                        }}
                        onClick={() => setPage(2)}
                        className={`w-full flex items-center justify-center gap-2 tablet:gap-5 opacity-70 hover:opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150`}
                      >
                        Siguiente
                        <img
                          className="w-3 object-contain -rotate-90 invert dark:invert-0"
                          src={arrowIcon}
                          alt="home-icon"
                        />
                      </button>
                    )}
                    {page === 2 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setPage(1)}
                          className={`w-full flex items-center justify-center gap-2 tablet:gap-5 bg-lightbgprimary dark:bg-darkbgprimary opacity-70
                                                     hover:opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150`}
                        >
                          <img
                            className="w-3 object-contain rotate-90 invert dark:invert-0"
                            src={arrowIcon}
                            alt="home-icon"
                          />
                          Volver
                        </button>
                        <button
                          type="button"
                          onClick={() => (client ? setPage(3) : "")}
                          style={{
                            backgroundColor: `${project.color_one}`,
                          }}
                          className={`w-full flex items-center justify-center gap-2 tablet:gap-5 opacity-70 hover:opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150`}
                        >
                          Siguiente
                          <img
                            className="w-3 object-contain -rotate-90 invert dark:invert-0"
                            src={arrowIcon}
                            alt="home-icon"
                          />
                        </button>
                      </>
                    )}
                    {page === 3 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setPage(2)}
                          className={`w-full flex items-center justify-center gap-2 tablet:gap-5 bg-lightbgprimary dark:bg-darkbgprimary opacity-50
                                                    hover:opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150`}
                        >
                          <img
                            className="w-3 object-contain rotate-90 invert dark:invert-0"
                            src={arrowIcon}
                            alt="home-icon"
                          />
                          Volver
                        </button>

                        <button
                          style={{
                            backgroundColor: `${project.color_one}`,
                          }}
                          className={`w-full flex items-center justify-center gap-2 tablet:gap-5 opacity-70 hover:opacity-100
                                                    rounded-lg py-2 tablet:py-3 transition-all duration-150`}
                        >
                          Confirmar
                          {loading ? (
                            <Spinner />
                          ) : (
                            <img
                              className="w-3 object-contain -rotate-90 invert dark:invert-0"
                              src={arrowIcon}
                              alt="home-icon"
                            />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sale;
