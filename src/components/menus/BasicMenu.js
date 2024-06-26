import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";

const BasicMenu = () => {


  /*
  // recoil사용으로 인한 redux-toolkit 주석 처리
  const loginState = useSelector(state => state.loginSlice)
  */

  // useCustomLogin에 선언해 놓은 리코일 상태를 가져와서 사용한다.
  const {loginState} = useCustomLogin();
  // alert("loginState: " + loginState.email);

  return (
    <nav id="navbar" className="flex bg-blue-300">
      <div className="w-4/5 bg-gray-500">
        <ul className="flex p-4 text-white font-bold">
          <li className="pr-6 text-2xl">
            <Link to={"/"}>Main</Link>
          </li>
          <li className="pr-6 text-2xl">
            <Link to={"/about"}>About</Link>
          </li>

          {loginState.email ? // 로그인 한 사용자만 출력되는 메뉴
            (<><li className="pr-6 text-2xl">
              <Link to={"/todo/"}>Todo</Link>
            </li>
              <li className="pr-6 text-2xl">
                <Link to={"/products/"}>Products</Link>
              </li>
            </>) :
            <></>
          }
        </ul>
      </div>

      <div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">

      {!loginState.email ? 
        <div className="text-white text-sm m-1 rounded">
          <Link to={'/member/login'}>Login</Link>
        </div> 
        : 
        <div className="text-white text-sm m-1 rounded">
          <Link to={'/member/logout'}>Logout</Link>
        </div> 
      }
        
      </div>
    </nav>
  );
};

export default BasicMenu;


/*
useSelector()는 파라미터로 함수를 지정한다. 이 함수를 이용해서 전달되는 애플리케이션 상태 중에 필요한 상태를 골라서 사용한다.
이 프로젝트에서는 loginSlice라는 이름으로 스토어에 등록 돼 있다.

const loginState = useSelector(state => state.loginSlice)

이 코드는 스토어의 상태 중에서 loginSlice에 해당하는 상태를 loginState라는 변수에 저장한다.
이제 loginState를 이용해서 로그인 상태를 확인하거나 변경할 수 있다.

*/