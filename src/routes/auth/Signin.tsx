//Dependenices
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
//Redux
import { login } from "../../redux/userReducer";
import { add } from "../../redux/projectReducer";
//Assets
import arrowIcon from "../../assets/images/icons/arrow-down-icon.png";
import userIcon from "../../assets/images/icons/user-icon.png";
import bgAbstract from "../../assets/images/bgs/abstract-black-background.png";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [image_Url, setImage_Url] = useState<File>();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [image_State, setImage_State] = useState<any>({
    profileImg: userIcon,
  });
  const { profileImg } = image_State;

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname as any);
    formData.append("lastname", lastname as any);
    formData.append("image_url", image_Url as any);
    formData.append("username", username as any);
    formData.append("email", email as any);
    formData.append("password", password as any);

    const response = await axios({
      url: `${import.meta.env.VITE_API_URL}/user`,
      data: formData,
      method: "post",
    });

    dispatch(login(response.data));

    if (response.data.token) {
      if (response.data.projects[0]) {
        dispatch(add(response.data.projects[0]));
        navigate("/resumen");
      } else navigate("/login");
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      setImage_Url(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage_State({ profileImg: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="fade-in grid grid-cols-1 laptop:grid-cols-2 mx-3 mobilL:mx-0 justify-center text-textlightprimary dark:text-textdarkprimary text-sm">
      <div className="relative hidden laptop:block">
        <div className="absolute h-[100vh] w-full z-50 grid place-content-center">
          <div className="w-[500px] flex flex-col gap-5">
            <h3 className="text-4xl">
              Primero, registra tu usuario personal. Luego, crea o accede a tus
              proyectos.
            </h3>
            <p>
              Dentro de tus proyectos podrás gestionarlo todo, abastecer tus
              necesidades y conectar con otros proyectos!
            </p>
          </div>
        </div>
        <img
          className="h-[100vh] rotate-180 object-cover invert dark:invert-0"
          src={bgAbstract}
          alt=""
        />
      </div>
      <div className="fade-in-left grid place-content-center">
        <form
          onSubmit={handleOnSubmit}
          className="bg-lightbgsecondary dark:bg-darkbgprimary w-full tablet:w-[450px] p-5 tablet:p-10 flex flex-col gap-5  rounded shadow-lg h-[95vh] laptop:h-full mt-[2vh] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded"
        >
          {/*  Head Signin */}

          <div>
            <h2 className="text-lg">Registro de Usuario</h2>
            <h3 className="font-light text-sm">
              Completa el formulario para continuar.
            </h3>
          </div>
          {/*  Form Signin */}
          <div className="w-full">
            {page === 1 && (
              <div className="fade-in flex flex-col gap-2">
                {/*   Firstname */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="firstname">Tu nombre *</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFirstname(e.target.value)
                    }
                    className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                    required
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder=""
                    value={firstname}
                  />
                </div>
                {/*   Lastname */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="lastname">Tu apellido *</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLastname(e.target.value)
                    }
                    className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                    required
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder=""
                    value={lastname}
                  />
                </div>
                {/*   Image */}
                <div className="relative flex flex-col gap-1 mt-4">
                  <div className="flex items-center justify-center gap-5">
                    <input
                      onChange={handleImage}
                      className="bg-darkbgsecondary cursor-pointer opacity-0 z-10 w-[150px] p-2 rounded"
                      required
                      type="file"
                      name="avatar"
                      id="avatar"
                    />
                    <div className="absolute w-[150px] mr-20 text-center text-sm py-2 rounded bg-lightbgprimary dark:bg-darkbgsecondary">
                      Una imagen
                    </div>
                    <div className="bg-lightbgprimary dark:bg-darkbgsecondary grid place-content-center rounded-full h-16 w-16">
                      <img
                        className={`${
                          profileImg !== userIcon
                            ? "h-14 w-14 m-1 rounded-full"
                            : "w-10 invert dark:invert-0"
                        } object-cover`}
                        src={profileImg}
                        alt="user-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {page === 2 && (
              <div className="fade-in flex flex-col gap-2">
                {/*   Username */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="username">Tu nombre de usuario *</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUsername(e.target.value)
                    }
                    className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                    required
                    type="text"
                    name="username"
                    id="username"
                    placeholder=""
                    value={username}
                  />
                </div>
                {/*   Email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">Tu email *</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                    required
                    type="text"
                    name="email"
                    id="email"
                    placeholder=""
                    value={email}
                  />
                </div>
                {/*  Password */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="password">Una contraseña *</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="•••••••••••"
                    value={password}
                  />
                </div>
                {/*  Re-password */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="repassword">Confirmar contraseña *</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRepassword(e.target.value)
                    }
                    className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                    required
                    type="password"
                    name="repassword"
                    id="repassword"
                    placeholder="•••••••••••"
                    value={repassword}
                  />
                </div>
              </div>
            )}
          </div>
          {/*   Button Signin */}
          <div className="fade-in-rights relative mt-3 gap-5 flex flex-col h-full justify-end">
            <h3 className="absolute text-end w-full top-[-15px] text-red-600">
              {errorMessage}
            </h3>
            {page === 1 && (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (firstname !== "" || lastname !== "" || image_Url) {
                      setPage(2);
                      setErrorMessage("");
                    } else {
                      setErrorMessage("Completa todos los campos.");
                    }
                  }}
                  className="bg-secondarycolor flex items-center justify-center gap-3 py-4 px-3 rounded w-full"
                >
                  Continuar
                  <img
                    className="w-3 object-contain -rotate-90 invert dark:invert-0"
                    src={arrowIcon}
                    alt="home-icon"
                  />
                </button>
                <div className="flex items-center gap-3">
                  <Link
                    className=" flex items-center justify-center gap-3 py-1 px-3 rounded"
                    to={"/login"}
                  >
                    <img
                      className="w-3 object-contain rotate-90 invert dark:invert-0"
                      src={arrowIcon}
                      alt="home-icon"
                    />
                    Volver
                  </Link>
                </div>
              </div>
            )}

            {page === 2 && (
              <div className="flex flex-col gap-2">
                <button className="bg-secondarycolor py-4 px-3 rounded w-full">
                  Finalizar
                </button>
                <div>
                  <button
                    type="button"
                    onClick={() => setPage(1)}
                    className="flex items-center justify-center gap-3 py-1 px-3 rounded"
                  >
                    <img
                      className="w-3 object-contain rotate-90 invert dark:invert-0"
                      src={arrowIcon}
                      alt="home-icon"
                    />
                    Volver
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
