import { useSelector } from "react-redux";
import UserTypes from "../../types/UserTypes";

function Profile() {
    const user = useSelector((state: UserTypes) => state.user);

    return (
        <div className="w-full">
            <div className="w-full text-start">
                <div className="flex items-staer gap-2 w-full justify-center">
                    <h3>Username: </h3>
                    <h3 className="font-semibold">{user.username}</h3>
                </div>
                <div className="flex items-center gap-2 w-full justify-center">
                    <h3>Email: </h3>
                    <h3 className="font-semibold">{user.email}</h3>
                </div>
            </div>
        </div>
    );
}

export default Profile;
