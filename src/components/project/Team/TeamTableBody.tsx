//Dependencies
import { useDispatch, useSelector } from "react-redux";
//Redux
import { add } from "../../../redux/projectReducer";
//Types
import { User, UserType } from "../../../types/UserTypes";
//Assets
import editIcon from "../../../assets/images/icons/edit-icon.png";
import exitIcon from "../../../assets/images/icons/exit-icon.png";
import axios from "axios";
import { Project } from "../../../types/ProjectTypes";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User;
  project: Project;
};

function TeamTableBody({ user, project }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { member }: any = user;
  const currentUser = useSelector((state: UserType) => state.user);

  const handleExitProject = async () => {
    navigate("/resumen");
    dispatch(add(null));
    await axios({
      url: `${import.meta.env.VITE_API_URL}/project/exit/${project._id}/${
        member._id
      }`,
      method: "patch",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
  };

  return (
    <>
      <li
        key={member._id}
        className="fade-in-left flex w-full items-center bg-lightbgprimary hover:bg-lightbgunder  dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150 dark:text-textdarkprimary text-textlightprimary"
      >
        <div className="flex w-[100px] tablet:w-[250px] items-center gap-3 tablet:gap-5">
          <img
            className="w-8 h-8 object-cover rounded-full"
            src={`${import.meta.env.VITE_SUPABASE_BUCKET_URL}/users/avatars/${
              member.image_url
            }`}
            alt=""
          />
          <div className="text-star">
            <h3 className="w-[80px] mobilL:w-[150px] mobilXL:w-[100px] text-sm truncate">
              {member.username}
            </h3>
          </div>
        </div>
        <div className="flex items-center w-full justify-around">
          <div>
            <h3 className="w-[100px] tablet:w-[100px] text-xs text-center text-textterceary truncate">
              {user.role?.name}
            </h3>
          </div>
        </div>
        <div className="justify-end w-[200px] flex gap-2">
          {currentUser.id === member._id && (
            <button
              onClick={handleExitProject}
              className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary px-3 py-1 rounded-lg"
            >
              <img
                className="w-4 object-contain dark:invert"
                src={exitIcon}
                alt=""
              />
            </button>
          )}
          <button className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary px-3 py-2 rounded-lg">
            <img
              className="w-3 object-contain invert dark:invert-0"
              src={editIcon}
              alt=""
            />
          </button>
        </div>
      </li>
    </>
  );
}

export default TeamTableBody;
