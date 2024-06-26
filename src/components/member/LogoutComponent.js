import { useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

import { cartState } from "../../atoms/cartState";

const LogoutComponent = () => {

    

    // const dispatch = useDispatch();

    const {doLogout, moveToPath} = useCustomLogin();

    const handleClickLogout = () => {
        // dispatch(logout())
        console.log("cartState before logout: ", cartState)
        doLogout()
        console.log("cartState before logout: ", cartState)
        alert("로그아웃 되었습니다.")
        moveToPath("/")
    }

    return (
        <div className="border-2 border-red-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-red-500">
                    Logout Page
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">
                        <button onClick={handleClickLogout} className="bg-red-500 text-white p-2 rounded">LOGOUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogoutComponent