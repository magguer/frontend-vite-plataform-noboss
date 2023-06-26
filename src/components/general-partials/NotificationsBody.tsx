//Dependencies
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
//Components
import Spinner from "./Spinner";
//Types
import { UserType } from "../../types/UserTypes";
import { ApplicationsType } from "../../types/ApplicationsType";
import { ApplicationType } from "../../types/ApplicationTypes";
//Assets
import tickIcon from "../../assets/images/icons/tick-icon.png";

function NotificationsBody({ project }) {
  const user = useSelector((state: UserType) => state.user);
  const [applications, setApplications] = useState<ApplicationsType>();

  useEffect(() => {
    const getApplications = async () => {
      try {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/application/?project=${
            project._id
          }`,
          method: "get",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setApplications(response.data);
      } catch (e) {}
    };
    getApplications();
  }, []);

  const handleAcceptApplication = async (application: ApplicationType) => {
    await axios({
      url: `${import.meta.env.VITE_API_URL}/application/${application}`,
      method: "patch",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  const handleDeclineApplication = async (userApplication: UserType) => {
    await axios({
      url: `${import.meta.env.VITE_API_URL}/project/appli/${project._id}`,
      method: "patch",
      data: { user: userApplication, pre_status: true },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  return (
    <div className="fade-in-right w-screen mobilXL:w-[300px] h-[350px] bg-lightbgunder dark:bg-darksubbgprimary rounded text-textlightprimary dark:text-textdarkprimary">
      <div className="text-center pt-3 text-sm">
        <h3>Noticiaciones</h3>
        <div
          style={{ background: `${project.color_one}` }}
          className="mt-2 h-[1px] w-full"
        />
      </div>
      {applications ? (
        <ul className="mt-2 px-2">
          {applications.map((application) => {
            return (
              <li className="bg-lightbgprimary dark:bg-darkbgprimary flex items-center text-xs gap-5 px-2 py-1 rounded justify-around">
                <img
                  className="w-6 h-6 rounded-full object-cover"
                  src={`${
                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                  }/users/avatars/${
                    application.user.image_url !== ""
                      ? application.user.image_url
                      : ""
                  }`}
                  alt="user-image"
                />
                <h3 className="w-full">{application.user.username}</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => handleAcceptApplication(application._id)}
                    style={{ backgroundColor: project.color_one }}
                    className="w-7 h-5 rounded-s-lg"
                  >
                    <img
                      className="w-3 dark:invert m-auto"
                      src={tickIcon}
                      alt=""
                    />
                  </button>
                  <button
                    onClick={() =>
                      handleDeclineApplication(application.user._id)
                    }
                    className="w-7 h-5 text-center rounded-e-lg bg-lightbgsecondary dark:bg-darkbgsecondary"
                  >
                    X
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="h-full w-full grid justify-center mt-20">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default NotificationsBody;
