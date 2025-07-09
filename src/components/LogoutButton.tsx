import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.services";
import { logout } from "../store/auth.slice";

export default function LogoutButton() {
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        authService.logout().then(() => dispatch(logout()));
    }
    return <button className="inline-lock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandler}>
        Logout
    </button>
}