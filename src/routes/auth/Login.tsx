import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userReducer";
import { add } from "../../redux/projectReducer";
import { useState } from "react";
import Spinner from "../../components/general-partials/Spinner";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const response = await axios({
            url: `${import.meta.env.VITE_API_URL}/user/token`,
            data: {
                username,
                password,
            },
            method: "post",
        });
        dispatch(login(response.data));
        if (response.data.token) {
            if (response.data.projects[0]) {
                dispatch(add(response.data.projects[0]));
                navigate("/resumen");
            } else {
                navigate("/login");
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="fade-in mobilL:grid mx-3 mobilL:mx-0 justify-center mt-2 mobilXL:mt-5  text-textlightprimary dark:text-textdarkprimary text-sm">
                <form
                    onSubmit={handleOnSubmit}
                    className="bg-lightbgsecondary dark:bg-darkbgprimary h-full py-5 px-6 grid gap-5 rounded"
                >
                    {/*  Head Login */}
                    <div className="">
                        <h2 className="font-bold text-lg">Bienvenido!</h2>
                        <h3 className="font-light">
                            Entrá para continuar en noboss.
                        </h3>
                    </div>
                    {/*  Form Login */}
                    <div className="flex flex-col gap-2 w-full mobilXL:w-[300px]">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="username">
                                Username o e-mail *
                            </label>
                            <input
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setUsername(e.target.value)}
                                className="bg-lightbgprimary dark:bg-darkbgsecondary p-2 w-full rounded"
                                required
                                type="text"
                                name="username"
                                id="username"
                                placeholder="username o e-mail"
                                value={username}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password">Password *</label>
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
                    </div>
                    {/*   Button Login */}
                    <div className="gap-2 flex flex-col mt-5">
                        <div className="w-full">
                            <button
                                className="bg-secondarycolor flex justify-center items-center gap-3 py-2 px-3 rounded w-full"
                                type="submit"
                            >
                                {loading && <Spinner />}
                                Entrar
                            </button>
                        </div>
                        <div className="w-full grid">
                            <h3 className="text-sm">No tenés usuario?</h3>
                            <Link
                                to={"/signin"}
                                className=" w-full bg-lightbgprimary dark:bg-darkbgsecondary py-2 px-3 rounded text-center"
                            >
                                Registate acá
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
