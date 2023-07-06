//Dependecies
import { useSelector, useDispatch } from "react-redux";
import { Suspense, lazy, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
//Redux
import { add } from "../redux/roleProjectReducer";
//Types
import { ProjectType } from "../types/ProjectTypes";
import { UserType } from "../types/UserTypes";
import { open } from "../redux/modalsReducer";
//Component
const NotificationsBody = lazy(
  () => import("../components/general-partials/NotificationsBody")
);
const YourProjectsList = lazy(
  () => import("../components/project/Project/YourProjectsList")
);

//Assets
import dashboardIcon from "../assets/images/icons/dashboard-icon.png";
import clientsIcon from "../assets/images/icons/clients-icon.png";
import noboxIcon from "../assets/images/icons/nobox-icon.png";
import diaryIcon from "../assets/images/icons/diary-icon.png";
import movementsIcon from "../assets/images/icons/movements-icon.png";
import servicesIcon from "../assets/images/icons/services-icon.png";
import saleIcon from "../assets/images/icons/sale-icon.png";
import spentIcon from "../assets/images/icons/spent-icon.png";
import noProjectImage from "../assets/images/no_projects_image.svg";

function DashboardLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showNotificatiosnBody, setShowNotificationsBody] =
    useState<boolean>(false);
  const [showSelectProjects, setShowSelectProjects] = useState<boolean>(false);
  const roleProject = useSelector((state: any) => state.roleProject);
  const project = useSelector((state: ProjectType) => state.project);
  const user = useSelector((state: UserType) => state.user);

  //roleProject
  useEffect(() => {
    if (project) {
      const member = project.members.find(
        (member: any) => member.member.username === user.username
      );
      dispatch(add(member.role));
    }
  }, [project]);

  return (
    <>
      <div className="fade-in-left">
        {/*  Notifications Components */}
        {showNotificatiosnBody && (
          <div className="absolute z-50 right-5 top-[65px]">
            <Suspense>
              <NotificationsBody project={project} />
            </Suspense>
          </div>
        )}
        {/*  Your Projects Component */}
        {showSelectProjects && (
          <div className="absolute z-50 top-12 tablet:top-[2px] right-1.5 tablet:right-20">
            <Suspense>
              <YourProjectsList
                showNotificatiosnBody={showNotificatiosnBody}
                setShowNotificationsBody={setShowNotificationsBody}
                setShowSelectProjects={setShowSelectProjects}
              />
            </Suspense>
          </div>
        )}
        {project ? (
          // With Project
          <div className="w-full">
            {/* Dashboard Header */}
            <div className="relative w-full text-center">
              {/* Logo */}
              <button
                style={{ backgroundColor: project.color_one }}
                onClick={() => {
                  setShowSelectProjects(!showSelectProjects);
                  setShowNotificationsBody(false);
                }}
                className="absolute right-3 z-30 tablet:right-4 top-1 tablet:top-[4px] rounded-full p-0.5"
              >
                <img
                  className="w-8 tablet:w-12 h-8 tablet:h-12 object-cover rounded-full"
                  src={`${
                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                  }/projects/logos/${project.logo_url}`}
                  alt=""
                />
              </button>
              {/* Banner */}
              <div className="w-full">
                {project.banner_url ? (
                  <div className="flex justify-center">
                    <img
                      className="w-full h-[45px] tablet:h-[60px] object-cover rounded-t"
                      src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                      }/projects/banners/${project.banner_url}`}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <img
                      className="w-full invert dark:invert-0 z-0 h-[45px] tablet:h-[60px] object-cover rounded-t"
                      src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                      }/projects/banners/default-banner.png`}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="px-2 mobilXL:px-3 mt-1">
              <div className="hidden tablet:flex items-baseline justify-between w-full">
                {/* Role / Path */}
                <div className="flex items-center gap-1">
                  <h2
                    style={{ color: `${project.color_one}` }}
                    className="text-sm font-semibold"
                  >
                    {roleProject?.name}
                  </h2>
                  <h2 className="hidden dark:text-textdarkprimary text-textlightprimary tablet:block text-sm font-medium">
                    ○{" "}
                    {location.pathname.slice(1).charAt(0).toUpperCase() +
                      location.pathname.slice(2)}
                  </h2>
                </div>
                {/* Gasto / Ingreso / Notificaciones */}
                <div className="flex gap-4">
                  {/*   Gasto */}
                  <button
                    onClick={() => dispatch(open("spentModal"))}
                    className={`bg-lightbuttonprimary dark:bg-darkbuttonringprimary 
                                    hover:dark:bg-red-950 transition-color duration-200 px-3 tablet:px-5 py-2 rounded-md`}
                  >
                    <img
                      className="w-4 invert dark:invert-0"
                      src={spentIcon}
                      alt=""
                    />
                  </button>
                  {/*   Ingreso */}
                  <button
                    onClick={() => dispatch(open("incomeModal"))}
                    className={`bg-lightbuttonprimary dark:bg-darkbuttonringprimary 
                                    hover:dark:bg-secondarycolor transition-color duration-200 px-3 tablet:px-5 py-2 rounded-md`}
                  >
                    <img
                      className="w-4 invert dark:invert-0"
                      src={saleIcon}
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <div className="flex w-full mt-1">
                {/*  All Functions */}
                <div className="hidden tablet:flex flex-col">
                  {/* Resumen */}
                  <Link
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Hello world!"
                    to={"/resumen"}
                    className={`${
                      location.pathname === "/resumen" &&
                      "bg-lightbuttonprimary dark:bg-darkbgunder"
                    } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                  >
                    <img
                      className="w-6 laptop:w-8 invert dark:invert-0"
                      src={dashboardIcon}
                      alt=""
                    />
                  </Link>
                  {/* Movimientos */}
                  <Link
                    to={"/movimientos"}
                    className={`${
                      location.pathname === "/movimientos" &&
                      "bg-lightbuttonprimary dark:bg-darkbgunder"
                    } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                  >
                    <img
                      className="w-9 dark:invert"
                      src={movementsIcon}
                      alt=""
                    />
                  </Link>
                  {/* Inventario */}
                  {project.products_on && (
                    <Link
                      to={"/inventario"}
                      className={`${
                        location.pathname === "/inventario" &&
                        "bg-lightbuttonprimary dark:bg-darkbgunder"
                      } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                    >
                      <img
                        className="w-6 laptop:w-8 invert dark:invert-0"
                        src={noboxIcon}
                        alt=""
                      />
                    </Link>
                  )}
                  {/* Servicios */}
                  {project.services_on && (
                    <Link
                      to={"/servicios"}
                      className={`${
                        location.pathname === "/servicios" &&
                        "bg-lightbuttonprimary dark:bg-darkbgunder"
                      } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-2 px-3 rounded-s-sm`}
                    >
                      <img
                        className="w-6 laptop:w-9 h-9 object-contain invert dark:invert-0"
                        src={servicesIcon}
                        alt=""
                      />
                    </Link>
                  )}
                  {/* Clientes */}
                  <Link
                    to={"/clientes"}
                    className={`${
                      location.pathname === "/clientes" &&
                      "bg-lightbuttonprimary dark:bg-darkbgunder"
                    } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                  >
                    <img
                      className="w-5 laptop:w-7 invert dark:invert-0"
                      src={clientsIcon}
                      alt=""
                    />
                  </Link>
                  {/* Agenda */}
                  <Link
                    to={"/agenda"}
                    className={`${
                      location.pathname === "/agenda" &&
                      "bg-lightbuttonprimary dark:bg-darkbgunder"
                    } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                  >
                    <img
                      className="w-5 laptop:w-6 invert dark:invert-0"
                      src={diaryIcon}
                      alt=""
                    />
                  </Link>
                </div>
                {/* Route */}
                <div className="w-full bg-lightbuttonprimary dark:bg-darkbgunder rounded-e-sm p-2 h-[calc(100dvh-168px)] tablet:h-[calc(100dvh-190px)]">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Without Project
          <div className="w-full p-4 h-full">
            <div className="w-full h-full grid justify-center text-center text-textlightprimary dark:text-textdarkprimary">
              <div className="mb-7 grid justify-center">
                <h3>Dashboard</h3>
                <h3 className="text-secondarycolor opacity-75 font-medium text-sm">
                  Selecciona, crea o accede a un proyecto.
                </h3>
                <div className="mt-4">
                  <YourProjectsList />
                </div>
              </div>
              <div className="grid tablet:flex gap-4 text-md tablet:text-lg [&>button]:bg-lightbgsecondary [&>button]:dark:bg-darkbgsecondary [&>button]:px-5 tablet:[&>button]:px-8 [&>button]:py-4 tablet:[&>button]:py-7 [&>button]:rounded">
                <button onClick={() => dispatch(open("addProject"))}>
                  Crear un Proyecto
                </button>
                <button>Acceder a Proyecto</button>
              </div>
              <div className="hidden tablet:grid place-content-center h-[45vh]">
                <img className="w-72" src={noProjectImage} alt="" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardLayout;
