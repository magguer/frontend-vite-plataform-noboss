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

function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
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
        console.log("entra");
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
        <div className="fade-in mobilL:grid mx-3 mobilL:mx-0 justify-center text-textlightprimary dark:text-textdarkprimary text-sm">
            <form
                onSubmit={handleOnSubmit}
                className="bg-lightbgsecondary dark:bg-darkbgprimary h-full py-5 px-6 grid gap-5 rounded"
            >
                {/*  Head Login */}
                <div>
                    <h2 className="text-lg">Registro de Usuario</h2>
                    <h3 className="font-light text-sm">
                        Completa el formulario para continuar.
                    </h3>
                </div>
                {/*  Form Login */}
                <div className="w-full mobilXL:w-[300px]">
                    {page === 1 && (
                        <div className="fade-in flex flex-col gap-2">
                            {/*   Firstname */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="firstname">Nombre *</label>
                                <input
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setFirstname(e.target.value)}
                                    className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                                    required
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    placeholder="Ej: Juan"
                                    value={firstname}
                                />
                            </div>
                            {/*   Lastname */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="lastname">Apellido *</label>
                                <input
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setLastname(e.target.value)}
                                    className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                                    required
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    placeholder="Ej: Gutierrez"
                                    value={lastname}
                                />
                            </div>
                            {/*   Image */}
                            <div className="relative flex flex-col gap-1 mt-2">
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
                                        {image_Url ? "Listo" : "Imagen"}
                                    </div>
                                    <div className="bg-lightbgprimary dark:bg-darkbgsecondary grid place-content-center rounded-full h-16 w-16">
                                        <img
                                            className={`${
                                                profileImg !== userIcon
                                                    ? "h-14 w-14 m-1 rounded-full"
                                                    : "w-10 invert"
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
                                <label htmlFor="username">Username *</label>
                                <input
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setUsername(e.target.value)}
                                    className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                                    required
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Ej: juanguti95"
                                    value={username}
                                />
                            </div>
                            {/*   Email */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email">Email *</label>
                                <input
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setEmail(e.target.value)}
                                    className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                                    required
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Ej: user@noboss.com"
                                    value={email}
                                />
                            </div>
                            {/*  Password */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="password">Contraseña *</label>
                                <input
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setPassword(e.target.value)}
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
                                <label htmlFor="repassword">
                                    Confirmar contraseña *
                                </label>
                                <input
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setRepassword(e.target.value)}
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
                {/*   Button Login */}
                <div className="gap-2 flex flex-col mt-3">
                    <>
                        {page === 1 && (
                            <button
                                type="button"
                                onClick={() => setPage(2)}
                                className="bg-secondarycolor flex items-center justify-center gap-3 py-2 px-3 rounded w-full"
                            >
                                Continuar
                                <img
                                    className="w-3 object-contain -rotate-90 invert dark:invert-0"
                                    src={arrowIcon}
                                    alt="home-icon"
                                />
                            </button>
                        )}
                        {page === 2 && (
                            <button className="bg-secondarycolor py-2 px-3 rounded w-full">
                                Registrarme
                            </button>
                        )}
                    </>

                    {page === 1 && (
                        <div className="w-full grid">
                            <h3 className="text-sm">Ya tenés usuario?</h3>
                            <Link
                                className="bg-lightbgprimary dark:bg-darkbgsecondary py-2 px-3 text-center rounded w-full"
                                to={"/login"}
                            >
                                Entrar
                            </Link>
                        </div>
                    )}
                    {page === 2 && (
                        <button
                            type="button"
                            onClick={() => setPage(1)}
                            className="bg-lightbgprimary dark:bg-darkbgsecondary flex items-center justify-center gap-3 py-2 px-3 rounded w-full"
                        >
                            <img
                                className="w-3 object-contain rotate-90 invert dark:invert-0"
                                src={arrowIcon}
                                alt="home-icon"
                            />
                            Atrás
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Signin;
