import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userReducer";
import { add } from "../../redux/projectReducer";
import { useState } from "react";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await axios({
            url: `${import.meta.env.VITE_API_URL}/user/token`,
            data: {
                username,
                password,
            },
            method: "post",
        });
        dispatch(login(response.data));
        /*         dispatch(add(response.data.projects[0])); */
        if (response.data.token) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="mobilL:grid mx-3 mobilL:mx-0 justify-center mt-10 laptop:mt-20">
            <form
                onSubmit={handleOnSubmit}
                className="bg-darkbgprimary h-full py-5 px-6 grid gap-5 rounded"
            >
                {/*  Head Login */}
                <div className="">
                    <h2 className="font-bold text-lg">Bienvenido!</h2>
                    <h3 className="font-light">
                        Entra para continuar en noboss...
                    </h3>
                </div>
                {/*  Form Login */}
                <div className="flex flex-col gap-2 w-[300px]">
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="username">
                            Username o e-mail
                        </label>
                        <input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(e.target.value)}
                            className="bg-darkbgsecondary p-2 w-full rounded"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="username o e-mail"
                            value={username}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(e.target.value)}
                            className="bg-darkbgsecondary p-2 w-full rounded"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="•••••••••••"
                            value={password}
                        />
                    </div>
                </div>
                {/*   Button Login */}
                <div className="gap-2 flex flex-col mt-5 font-semibold">
                    <div className="w-full">
                        <button
                            className="bg-secondarycolor py-2 px-3 rounded w-full"
                            type="submit"
                        >
                            Entrar
                        </button>
                    </div>
                    <div className=" w-full">
                        <button
                            className=" bg-darkbgsecondary py-2 px-3 rounded w-full"
                            type="submit"
                        >
                            Registrarme
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
