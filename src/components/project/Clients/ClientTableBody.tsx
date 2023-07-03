//Types
import { ClientType } from "../../../types/ClientTypes";
//Assets
import userIcon from "../../../assets/images/icons/user-icon.png";
import editIcon from "../../../assets/images/icons/edit-icon.png";
import phoneIcon from "../../../assets/images/icons/whatsapp-icon.png";

function ClientTableBody({ client, roleProject }: any) {
  return (
    <div className="fade-in-left flex items-center text-xs tablet:text-sm dark:text-textdarkprimary text-textlightprimary bg-lightbgprimary hover:bg-lightbgunder dark:bg-darkbgsecondary hover:dark:bg-darkbgunder cursor-pointer rounded px-2 py-1 transition-colors duration-150 z-40">
      <button className="flex w-full items-center pr-1">
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
        <div className="hidden tablet:flex justify-center w-full">
          <h3 className="w-[150px] text-textlightterceary dark:text-textdarkterceary text-xs font-medium">
            {client.type}
          </h3>
        </div>
        <div className="hidden laptop:flex justify-center w-full">
          <h3 className="w-[150px] truncate text-textlightterceary dark:text-textdarkterceary text-center text-xs font-medium">
            {client.email ? client.email : "-"}
          </h3>
        </div>
        <div className="hidden mobilXL:flex justify-center tablet:w-full">
          <h3 className="w-[150px] text-textlightterceary dark:text-textdarkterceary text-center text-xs font-medium">
            {client.orders?.length} / Orders
          </h3>
        </div>
      </button>
      {/* Edit Button */}
      <div className="flex gap-2 w-[100px] justify-end">
        {client.phone && (
          <a
            href={`https://wa.me/+598${client.phone}`}
            target="_blank"
            className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonhoverprimary dark:hover:bg-darkbgprimary  dark:focus:ring-darkbuttonringprimary relative p-3 z-50 rounded-lg "
          >
            <img
              className="w-3 tablet:w-4 object-contain dark:invert"
              src={phoneIcon}
              alt=""
            />
          </a>
        )}
        {roleProject.matriz.editClient && (
          <button className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonhoverprimary dark:hover:bg-darkbgprimary  dark:focus:ring-darkbuttonringprimary relative p-3 z-50 rounded-lg ">
            <img
              className="w-3 tablet:w-4 h-3 object-contain invert dark:invert-0"
              src={editIcon}
              alt=""
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default ClientTableBody;
