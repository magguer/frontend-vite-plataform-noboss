import { useSelector } from "react-redux";
import { UserType } from "../../types/UserTypes";

function Profile() {
    const user = useSelector((state: UserType) => state.user);

    return (
        <div className="fade-in-left w-full dark:text-textdarkprimary text-textlightprimary">
            <div className="w-full text-start">
                <div className="flex items-staer gap-2 w-full justify-center">
                    <h3>Username: </h3>
                    <h3>{user.username}</h3>
                </div>
                <div className="flex items-center gap-2 w-full justify-center">
                    <h3>Email: </h3>
                    <h3>{user.email}</h3>
                </div>
            </div>
        </div>
    );
}

export default Profile;
