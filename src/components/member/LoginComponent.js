import { useState } from "react";
import { useNavigate } from "react-router-dom";

// useDispatch()를 통해 리덕스 스토어에 액션을 전달한다.
import { useDispatch } from "react-redux";

// 리듀서(함수) 임포트
import { login } from "../../slices/loginSlice";

// 비동기 로그인 처리를 위한 함수 임포트
import { loginPostAsync } from "../../slices/loginSlice";


const initState = {
    email: "",
    password: "",
}

const LoginComponent = () => {

    const [loginParam, setLoginParam] = useState(initState)

    // 디스패치 함수
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({ ...loginParam })
    }

    //  로그인 버튼 클릭 시 호출
    const handleClickLogin = () => {
        // loginParam을 리듀서 함수인 login()에 전달하고 이를 다시 디스패치 함수로 전달한다.
        // dispatch(login(loginParam))  //  동기화된 호출
        
        dispatch(loginPostAsync(loginParam))    // loginSlice의 비동기 호출
        .unwrap()   // 비동기 호출의 결과를 반환한다.
        .then((data) => {
            console.log("after unwrap...")
            console.log(data)
            if(data.error) {
                alert("이메일과 패스워드를 다시 확인하세요")
            }else {
                alert("로그인 성공")
                navigate({pathname: "/"}, {replace: true})  // 뒤로가기 했을 때 로그인 화면을 볼 수 없도록
            }
        })
    }

    return (

        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
                    Login Component
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">
                        Email
                    </div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="email"
                        type={"text"}
                        value={loginParam.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">
                        Password
                    </div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="pw"
                        type={"password"}
                        value={loginParam.pw}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                        <button className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                            onClick={handleClickLogin}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent




/*
    LoginComponent에서는 LOGIN 버튼을 클릭했을 때 리듀서를 호출하고 이를 useDispatch()를 통해 액션을 전달한다.
    즉 애플리케이션의 상태를 변경하는 작업을 수행한다.

*/