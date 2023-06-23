// Dependencies
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Types
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
// Components
import Spinner from "../../general-partials/Spinner";
import ModalLayout from "../../../layouts/ModalLayout";
//Redux
import { close } from "../../../redux/modalsReducer";
import {
  addCategory,
  getCategoriesList,
} from "../../../redux/categoriesReducer";
import {
  addSubcategory,
  getSubcategoriesList,
} from "../../../redux/subcategoriesReducer";
//Assets
import deleteIcon from "../../../assets/images/icons/delete-icon.png";

export default function AddCategoryModal() {
  const dispatch = useDispatch();
  const user = useSelector((state: UserType) => state.user);
  const project = useSelector((state: ProjectType) => state.project);
  const categories = useSelector((state: any) => state.categories);
  const sub_categories = useSelector((state: any) => state.subcategories);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nameCategory, setNameCategory] = useState<string>();
  const [nameSubCategory, setNameSubCategory] = useState<string>();
  const [category, setCategory] = useState<any>();
  const [categoryName, setCategoryName] = useState();

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/category/?project=${project._id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCategory(response.data[0]);
      dispatch(getCategoriesList(response.data));
      dispatch(getSubcategoriesList(response.data[0].sub_categories));
    };
    getCategories();
  }, []);

  const handleSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/category`,
      data: {
        nameCategory,
        project: project._id,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(addCategory(response.data));
    setNameCategory("");
    setLoading(false);
  };

  const handleSubmitSubCategory = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/subcategory`,
      data: {
        nameSubCategory,
        project: project._id,
        category,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(addSubcategory(response.data));
    setNameSubCategory("");
    setLoading(false);
  };

  const handleDeleteSub_Category = async (sub_category: any) => {
    setLoading(true);
    const response = await axios({
      method: "delete",
      url: `${
        import.meta.env.VITE_API_URL
      }/subcategory/${sub_category}?project=${project?._id}&category=${
        category._id
      }`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log(response.data);
    dispatch(getSubcategoriesList(response.data));
    setLoading(false);
  };

  return (
    <>
      <ModalLayout exit={() => dispatch(close(null))}>
        {/*    Form Add CATEGORY */}
        <div className="bg-lightbgprimary dark:bg-darkbgprimary rounded p-5 tablet:p-10 text-textlightprimary dark:text-textdarkprimary">
          <div className="grid tablet:flex tablet:gap-3 justify-center w-full">
            <div>
              <div>
                <div className="px-2">
                  {/* ADD CATEGORY */}
                  {page === 1 && (
                    <form
                      onSubmit={handleSubmitCategory}
                      className="grid gap-5 w-full mobilXL:w-[380px] fade-in-right"
                    >
                      {/*   Header Page 1 */}
                      <div className="flex items-center gap-5">
                        <img
                          className="w-14 rounded-full"
                          src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                          }/projects/logos/${project.logo_url}`}
                          alt=""
                        />
                        <div className="flex flex-col text-start">
                          <h3 className="text-lg tablet:text-xl font-semibold text-textsecondary">
                            Administrador de Categorías
                          </h3>
                          <h3 className="text-sm tablet:text-base">
                            Organiza las categorías:
                          </h3>
                        </div>
                      </div>
                      {/*   Form Page 1 */}
                      <div className="bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                        <div className="w-full flex flex-col justify-between gap-5">
                          <div className="grid gap-2">
                            <div className="grid gap-1 w-full">
                              <label
                                className="ml-1 text-start text-sm  mb-1"
                                htmlFor="price"
                              >
                                Nombre de la Categoría *
                              </label>
                              <input
                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                type="text"
                                placeholder="Ej: Indumentaria"
                                name="price"
                                id="price"
                                value={nameCategory}
                                onChange={(e: any) =>
                                  setNameCategory(e.target.value)
                                }
                              />
                            </div>
                            <div className="w-full grid">
                              <button className="bg-lightbgprimary dark:bg-darkbgprimary hover:bg-lightbgunder dark:hover:bg-darkbgunder py-2 rounded transition-all duration-150">
                                +
                              </button>
                            </div>
                          </div>
                          {/*  Lista de Tus Categorías */}
                          {categories ? (
                            categories.length >= 1 && (
                              <div>
                                <div className="grid gap-1 w-full">
                                  <div
                                    style={{
                                      borderColor: `${project.color_one}`,
                                    }}
                                    className="w-full py-2 px-3 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 border-2"
                                  >
                                    <h3 className="ml-1 text-start text-sm  mb-1">
                                      Tus categorias actuales:
                                    </h3>
                                    <div className="max-h-[20vh] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-thumb-darkbgsecondary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
                                      {categories?.map((category: any) => {
                                        return (
                                          <div className="bg-lightbgsecondary dark:bg-darkbgsecondary rounded flex items-center justify-between px-3 py-1 mb-1 text-sm">
                                            <h3 className="text-start w-[140px] truncate">
                                              {category.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  setPage(2);
                                                  setCategory(category);
                                                  dispatch(
                                                    getSubcategoriesList(
                                                      category.sub_categories
                                                    )
                                                  );
                                                  setCategoryName(
                                                    category.name
                                                  );
                                                }}
                                                style={{
                                                  backgroundColor: `${project.color_one}`,
                                                }}
                                                className="px-2 py-1 text-[10px] opacity-50 hover:opacity-100 rounded-lg transition-all duration-150"
                                              >
                                                Subcategorias
                                              </button>
                                              <button
                                                type="button"
                                                className="border border-red-800 rounded p-1"
                                              >
                                                <img
                                                  src={deleteIcon}
                                                  className="w-3 dark:invert"
                                                  alt=""
                                                />
                                              </button>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          ) : (
                            <Spinner />
                          )}
                        </div>
                      </div>
                      {/*   Buttons Page 1 */}
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => dispatch(close(null))}
                          type="button"
                          className="w-full text-center bg-lightbgsecondary dark:bg-darkbgsecondary opacity-50 hover:opacity-100  rounded-lg py-2 tablet:py-3 transition-all duration-150"
                        >
                          Listo
                        </button>
                      </div>
                    </form>
                  )}

                  {/* ADD SUBCATEGORY */}
                  {page === 2 && (
                    <form
                      onSubmit={handleSubmitSubCategory}
                      className="grid gap-5 w-full mobilXL:w-[380px] fade-in-right"
                    >
                      {/*   Header Page 1 */}
                      <div className="flex items-center gap-5">
                        <img
                          className="w-14 rounded-full"
                          src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                          }/projects/logos/${project.logo_url}`}
                          alt=""
                        />
                        <div className="flex flex-col text-start">
                          <h3>Categoria:</h3>
                          <h3 className="text-lg tablet:text-xl font-semibold text-textsecondary">
                            {categoryName}
                          </h3>
                          <h3 className="text-sm tablet:text-base"></h3>
                        </div>
                      </div>
                      {/*   Form Page 1 */}
                      <div className="bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                        <div className="w-full flex flex-col justify-between gap-5">
                          <div className="grid gap-2">
                            <div className="grid gap-1 w-full">
                              <label
                                className="ml-1 text-start text-sm  mb-1"
                                htmlFor="price"
                              >
                                Nombre de la nueva Subcategoría *
                              </label>
                              <input
                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                type="text"
                                placeholder="Ej: Gorros"
                                name="price"
                                id="price"
                                value={nameSubCategory}
                                onChange={(e: any) =>
                                  setNameSubCategory(e.target.value)
                                }
                              />
                            </div>
                            <div className="w-full grid">
                              <button className="bg-lightbgprimary dark:bg-darkbgprimary hover:bg-lightbgunder dark:hover:bg-darkbgunder py-2 rounded transition-all duration-150">
                                +
                              </button>
                            </div>
                          </div>
                          {/*  Lista de Tus Sub_Categorías */}
                          {sub_categories.length >= 1 ? (
                            <div>
                              <div className="grid gap-1 w-full">
                                <div
                                  style={{
                                    borderColor: `${project.color_one}`,
                                  }}
                                  className="w-full py-2 px-3 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 border-2"
                                >
                                  <h3 className="ml-1 text-start text-sm  mb-1">
                                    Subcategorías actuales:
                                  </h3>
                                  <div className="max-h-[20vh] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-thumb-darkbgsecondary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
                                    {sub_categories.map((sub_category: any) => {
                                      return (
                                        <div className="bg-lightbgsecondary dark:bg-darkbgsecondary rounded flex items-center justify-between px-3 py-1 mb-1 text-sm">
                                          <h3>{sub_category.name}</h3>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleDeleteSub_Category(
                                                sub_category._id
                                              )
                                            }
                                            className="border border-red-800 rounded p-1"
                                          >
                                            <img
                                              src={deleteIcon}
                                              className="w-3 dark:invert"
                                              alt=""
                                            />
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid place-content-center h-[24vh]">
                              <h3>Aún no existen subcategorias.</h3>
                            </div>
                          )}
                        </div>
                      </div>
                      {/*   Buttons Page 1 */}
                      <div className="flex gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setPage(1);
                            dispatch(getSubcategoriesList([]));
                          }}
                          style={{
                            backgroundColor: `${project.color_one}`,
                          }}
                          className="w-full flex items-center justify-center gap-5 opacity-50 hover:opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150"
                        >
                          Categorias
                        </button>
                        <button
                          onClick={() => dispatch(close(null))}
                          className="w-full text-center bg-lightbgsecondary dark:bg-darkbgsecondary opacity-50 hover:opacity-100  rounded-lg py-2 tablet:py-3 transition-all duration-150"
                        >
                          Listo
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalLayout>
    </>
  );
}
