//Dependencies
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//Redux
import { login } from "../../redux/userReducer";
import { add } from "../../redux/projectReducer";
//Components
import Spinner from "../../components/general-partials/Spinner";
//Assets
import bgAbstract from "../../assets/images/bgs/abstract-black-background.png";
import logoNoboss from "../../assets/images/logos/noboss-logo-xl.png";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/user/token`,
        data: {
          username,
          password,
        },
        method: "post",
      });
      if (response.data.token) {
        dispatch(login(response.data));
        if (response.data.projects[0]) {
          dispatch(add(response.data.projects[0]));
          navigate("/resumen");
        } else {
          navigate("/login");
        }
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage("Credenciales incorrectas.");
      }
    } catch {
      setLoading(false);
      setError(true);
      setErrorMessage("Credenciales incorrectas.");
    }
  };

  return (
    <div>
      <div className="fade-in grid grid-cols-1 laptop:grid-cols-2 justify-center  text-textlightprimary dark:text-textdarkprimary text-sm">
        <div className="fade-in-right h-[100vh] grid place-content-center">
          <form
            onSubmit={handleOnSubmit}
            className="p-5 tablet:p-10 gap-5 flex flex-col rounded shadow-lg bg-lightbgsecondary dark:bg-darkbgprimary"
          >
            {/*  Head Login */}
            <div>
              <div className="w-full flex justify-end">
                <img
                  className="w-28 invert dark:invert-0"
                  src={logoNoboss}
                  alt="noboss-logo"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg">Iniciar Sesión</h1>
                <h3 className="font-light">
                  Ingresá tus credenciales para continuar en noboss.
                </h3>
              </div>
            </div>

            {/*  Form Login */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="username">Username o e-mail</label>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                  className={`bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded`}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="ejemplo@email.com"
                  value={username}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className={`bg-lightbgprimary dark:bg-darkbgsecondary
                                     p-2 w-full rounded`}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="•••••••••••"
                  value={password}
                />
              </div>
            </div>
            {/*   Button Login */}
            <div className="relative gap-2 flex flex-col mt-5">
              <h3 className="text-red-600 right-0 absolute top-[-25px]">
                {errorMessage}
              </h3>
              <div className="w-full">
                <button
                  className="bg-secondarycolor flex justify-center items-center gap-3 py-4 px-3 rounded w-full"
                  type="submit"
                >
                  {loading && <Spinner />}
                  Entrar
                </button>
              </div>
              <div className="w-full grid">
                <Link
                  to={"/signin"}
                  className="w-full py-2 px-3 rounded text-end"
                >
                  No tenés usuario? Registate
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="relative hidden laptop:block">
          <div className="absolute h-[100vh] w-full z-50 grid place-content-center">
            <div className="w-[500px] flex flex-col gap-10">
              <h3 className="text-4xl">
                Te damos la bienvenida a Noboss, la plataforma integral para
                emprendedores.
              </h3>
              <p>
                Creamos las herramientas que necesita tu emprendimiento para
                nacer y crecer saludablemente.
              </p>
            </div>
          </div>
          <img
            className="h-[100vh] object-cover invert dark:invert-0"
            src={bgAbstract}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
