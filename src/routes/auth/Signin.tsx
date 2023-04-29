import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userReducer";
import { add } from "../../redux/projectReducer";
import { useState } from "react";

function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

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
        if (response.data.token) {
            if (response.data.projects[0]) {
                dispatch(add(response.data.projects[0]));
                navigate("/resumen");
            } else navigate("/login");
        }
    };

    return (
        <div className="mobilL:grid mx-3 mobilL:mx-0 justify-center mt-2 mobilXL:mt-5">
            <form
                onSubmit={handleOnSubmit}
                className="bg-darkbgprimary h-full py-5 px-6 grid gap-5 rounded"
            >
                {/*  Head Login */}
                <div className="">
                    <h2 className="font-bold text-lg">
                        Estas a punto de crear un Usuario.
                    </h2>
                    <h3 className="font-light">
                        Completa el formulario para continuar...
                    </h3>
                </div>
                {/*  Form Login */}
                <div className="flex flex-col gap-2 w-full mobilXL:w-[300px]">
                    {/*   Username */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="username">
                            Username
                        </label>
                        <input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(e.target.value)}
                            className="bg-darkbgsecondary p-2 w-full rounded"
                            required
                            type="text"
                            name="username"
                            id="username"
                            placeholder="user95"
                            value={username}
                        />
                    </div>
                    {/*   Email */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="username">
                            Email
                        </label>
                        <input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(e.target.value)}
                            className="bg-darkbgsecondary p-2 w-full rounded"
                            required
                            type="text"
                            name="email"
                            id="email"
                            placeholder="user@noboss.com"
                            value={username}
                        />
                    </div>
                    {/*  Password */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(e.target.value)}
                            className="bg-darkbgsecondary p-2 w-full rounded"
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
                        <label className="font-semibold" htmlFor="password">
                            Repetir password
                        </label>
                        <input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(e.target.value)}
                            className="bg-darkbgsecondary p-2 w-full rounded"
                            required
                            type="password"
                            name="repassword"
                            id="repassword"
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
                            Registrarme
                        </button>
                    </div>
                    <Link
                        className=" bg-darkbgsecondary py-2 px-3 text-center rounded w-full"
                        to={"/login"}
                    >
                        Acceder
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Signin;
