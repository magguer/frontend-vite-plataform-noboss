import { useDispatch, useSelector } from "react-redux";
import { item } from "../../../redux/itemProfileReducer";
import { useState } from "react";
import ProductTypes from "../../../types/ProductTypes";
import ModalLayout from "../../../layouts/ModalLayout";

export default function AddItemModal() {
    const dispatch = useDispatch();
    const products = useSelector((state: ProductTypes) => state.product);
    const [randomProducts, setRandomProducts] = useState([]);

    return (
        <>
            <ModalLayout exit={() => dispatch(item(null))}>
                {/*    Form Add Product */}
                <div className="grid tablet:flex gap-5 bg-darkbgprimary rounded p-5"></div>
            </ModalLayout>
        </>
    );
}
