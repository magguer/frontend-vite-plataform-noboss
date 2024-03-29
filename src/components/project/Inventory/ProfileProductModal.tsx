// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// Redux
import { item } from "../../../redux/itemProfileReducer";
//Types
import { ProductsType } from "../../../types/ProductsType";
import { ProjectType } from "../../../types/ProjectTypes";
//Layouts
import ModalLayout from "../../../layouts/ModalLayout";
//Assets
import arrowIcon from "../../../assets/images/icons/arrow-down-icon.png";
import editIcon from "../../../assets/images/icons/edit-icon.png";

export default function ProfileItemModal() {
  const dispatch = useDispatch();
  const products = useSelector((state: ProductsType) => state.products);
  const project = useSelector((state: ProjectType) => state.project);
  const itemProfile = useSelector((state: any) => state.itemProfile);
  const [randomProducts] = useState<string[]>([]);
  const [showImage, setShowImage] = useState(itemProfile.images_url[0]);
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  /*     while (randomProducts.length < 3) {
        const product: any =
            products[Math.floor(Math.random() * products.length)];
        if (!randomProducts.includes(product)) {
            randomProducts.push(product);
        }
    } */

  return (
    <>
      <ModalLayout exit={() => dispatch(item(null))}>
        {/*             Form Edit Brand */}
        <div className="grid tablet:flex gap-5 bg-lightbgprimary dark:bg-darkbgprimary text-textlightprimary dark:text-textdarkprimary rounded p-5">
          {/*  Item Images */}
          <div className="hidden tablet:flex gap-3 justify-center">
            <div className="flex flex-col gap-2 pr-2 max-h-[34vh] tablet:max-h-[50vh] overflow-auto scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded ">
              {itemProfile.images_url.map((image: any, i: any) => {
                return (
                  <div key={i} className="grid relative gap-2 justify-center">
                    <div className="">
                      <img
                        key={i}
                        onMouseEnter={() => setShowImage(image)}
                        className="bg-bgPrimaryColor z-50 w-14 h-14 object-cover cursor-pointer border p-1 fade-in-fast"
                        src={`${
                          import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/projects/${project._id}/products/${image}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <img
              className="w-44 h-44 tablet:w-96 tablet:h-96 object-contain rounded-sm"
              src={`${import.meta.env.VITE_SUPABASE_BUCKET_URL}/projects/${
                project._id
              }/products/${showImage}`}
              alt=""
            />
          </div>
          {/*  Item Data */}
          <div className="flex flex-col gap-2 text-start border-2 border-textprimary rounded border-opacity-10">
            {/*  Header Item Modal */}
            <div className="relative">
              <div className="w-full absolute">
                {project.banner_url ? (
                  <div className="flex justify-center">
                    <img
                      className="w-full h-[60px] object-cover rounded-t"
                      src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                      }/projects/${project._id}/banner/${project.banner_url}`}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <img
                      className="w-full h-[60px] object-cover rounded-t"
                      src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                      }/projects/default/banner/default-banner.png`}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 relative mx-2 my-1 bg-lightbgsecondary dark:bg-[#00000084] bg-opacity-60 rounded px-2 pb-1">
                <div>
                  <img
                    className="w-10 object-contain rounded-full"
                    src={`${
                      import.meta.env.VITE_SUPABASE_BUCKET_URL
                    }/projects/${project._id}/logo/${project.logo_url}`}
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="text-md font-medium max-w-[250px]">
                    {itemProfile.model}
                  </h3>
                  <h3
                    style={{
                      color: `${project.color_one}`,
                    }}
                    className="text-sm font-medium "
                  >
                    {itemProfile.category.name} -{" "}
                    {itemProfile.sub_category.name}
                  </h3>
                </div>
              </div>
            </div>
            {/* Data Item Modal */}
            <div className="h-full grid gap-2 px-3 pb-2">
              <div className="text-textterceary grid mobilL:flex gap-2 items-center justify-end mb-2">
                <div className="flex gap-2">
                  <div>
                    <h5 className="text-xs">precio</h5>
                    <h4 className="p-1 px-3 rounded bg-lightbgsecondary dark:bg-darkbgsecondary">
                      ${itemProfile.price}
                    </h4>
                  </div>
                  <div>
                    <h5 className="text-xs">costo</h5>
                    <h4 className="p-1 px-3 rounded bg-lightbgsecondary dark:bg-darkbgsecondary">
                      ${itemProfile.cost}
                    </h4>
                  </div>
                  <div>
                    <h5 className="text-xs">ganancia</h5>
                    <h4 className="p-1 px-3 rounded bg-lightbgsecondary dark:bg-darkbgsecondary">
                      ${itemProfile.price - itemProfile.cost}
                    </h4>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div>
                    <h5 className="text-xs">stock</h5>
                    <h4 className="p-1 px-3 rounded bg-lightbgsecondary dark:bg-darkbgsecondary">
                      {itemProfile.stock} u
                    </h4>
                  </div>
                </div>
              </div>
              {itemProfile.description && (
                <div className="grid p-1 px-2 rounded bg-lightbgsecondary dark:bg-darkbgsecondary">
                  <h2 className="text-sm">Descripción: </h2>
                  <p
                    className={`text-start text-textterceary text-sm max-w-[300px] transition-all duration-100 scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded overflow-auto  ${
                      showMoreDescription ? "max-h-[20vh]" : "max-h-[6vh]"
                    }`}
                  >
                    {itemProfile.description}
                  </p>
                  <button
                    className=" grid justify-center py-1 mt-2 "
                    onClick={() => setShowMoreDescription(!showMoreDescription)}
                  >
                    <img
                      className={`w-3 h-3 object-contain ${
                        showMoreDescription ? "rotate-180" : "rotate-0 "
                      }`}
                      src={arrowIcon}
                      alt=""
                    />
                  </button>
                </div>
              )}

              {/* Button  Edit */}
              <div className="flex justify-end gap-3 h-full items-end">
                <button className="p-2 px-3 bg-lightbgsecondary dark:bg-darkbgsecondary rounded">
                  <img
                    className="w-3 tablet:w-5 object-contain"
                    src={editIcon}
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalLayout>
    </>
  );
}
