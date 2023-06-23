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

export default function AddBookingModal() {
  const dispatch = useDispatch();
  const user = useSelector((state: UserType) => state.user);
  const project = useSelector((state: ProjectType) => state.project);
  const date = useSelector((state: any) => state.date);
  const categories = useSelector((state: any) => state.categories);
  const sub_categories = useSelector((state: any) => state.subcategories);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nameCategory, setNameCategory] = useState<string>();
  const [nameSubCategory, setNameSubCategory] = useState<string>();
  const [category, setCategory] = useState<any>();
  const [categoryName, setCategoryName] = useState();

  const handleSubmitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/booking`,
      data: {
        project: project._id,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setLoading(false);
  };

  return (
    <>
      <ModalLayout exit={() => dispatch(close(null))}>
        {/*    Form Add Product */}
        <div className="bg-lightbgprimary dark:bg-darkbgprimary rounded p-5 tablet:p-10 text-textlightprimary dark:text-textdarkprimary">
          <div className="grid tablet:flex tablet:gap-3 justify-center w-full">
            {/*          ADD INFO PRODUCTS */}
            <div>
              <div>
                <div className="px-2">
                  {/* ADD CATEGORY */}
                  {page === 1 && (
                    <form
                      onSubmit={handleSubmitBooking}
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
                            Agendar un evento
                          </h3>
                          <h3 className="text-sm tablet:text-base">{date}</h3>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalLayout>
    </>
  );
}
