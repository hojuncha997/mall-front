import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, createSearchParams } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const loginState = useSelector(state => state.loginSlice)   // -------로그인 상태

    const isLogin = loginState.email ? true : false;    // ---------------로그인 여부

    const doLogin = async (loginParam) => {     // -----------------------로그인 함수
        const action = await dispatch(loginPostAsync(loginParam))
        return action.payload
    }

    const doLogout = () => {    // --------------------------------------로그아웃 함수
        dispatch(logout())
    }

    const moveToPath = (path) => {    // --------------------------------경로 이동 함수
        navigate({ pathname: path }, { replace: true })
    }

    const moveToLogin = () => {    // ---------------------------로그인 페이지 이동 함수
        navigate({ pathname: "/member/login" }, { replace: true })
    }

    const moveToLoginReturn = () => {    // ------------------로그인 페이지 이동 컴포넌트
        return <Navigate replace to={"/member/login"} />
    }


    const exceptionHandle = (ex) => {
        console.log("Exception----------------------------------")
        console.log(ex)
        const errorMsg = ex.response.data.error

        const errorStr = createSearchParams({ error: errorMsg }).toString()

        if (errorMsg === "REQUIRE_LOGIN") {
            alert("로그인 해야만 합니다.")

            // 로그인 페이지로 이동. search의 의미는 쿼리스트링을 의미한다.
            navigate({ pathname: "/member/login", search: errorStr })
            return
        }

        if (ex.response.data.error === "ERROR_ACCESS_DENIED") {
            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.")
            navigate({ pathname: "/member/login", search: errorStr })
            return
        }
    }



    return { loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn, exceptionHandle }

}

export default useCustomLogin;

/*
    이 커스텀 훅은 로그인과 로그아웃 처리를 위한 함수들과 로그인 상태를 조회하는 함수들을 제공한다.

    이 훅을 사용하려면 컴포넌트에서 import해서 사용하면 된다.
    이 훅을 사용하면 로그인 상태를 조회하거나 로그인/로그아웃을 처리하는 함수를 제공받을 수 있다.
    이를 이용해서 로그인 상태를 조회하거나 로그인/로그아웃을 처리할 수 있다.

*/