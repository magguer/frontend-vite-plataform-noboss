import { useSelector } from "react-redux";
import UserTypes from "../../types/UserTypes";

function Profile() {
    const user = useSelector((state: UserTypes) => state.user);

    return (
        <div className="w-full">
            <div className="w-full text-center">
                <h3 className="font-semibold">Profile</h3>
                <div className="flex items-center gap-2 w-full justify-center">
                    <h3>Username: </h3>
                    <h3>{user.username}</h3>
                </div>
            </div>
        </div>
    );
}

export default Profile;
