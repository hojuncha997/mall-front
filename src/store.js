import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";

/*
    configureStore()의 파라미터에는 설정에 필요한 정보들을 객체로 전달하며,
    reducer라는 속성으로 '리듀서(Reducer)'라고 불리는 함수들을 지정하여 사용하게 된다.

    이렇게 생성한 store로 프로젝트의 index.js 의 내용을 감싸준다.
*/

export default configureStore({
  reducer: {
    loginSlice: loginSlice,
    cartSlice: cartSlice,
  },
});

/*
  애플리케이션의 상태를 변경하기 위해서는 리듀서 함수(login(), logout() 등)를 호출하거나 변경된 상태를 전달(notify-통지) 받아야만 한다.
  이를 위해서 useSelector(), useDispatch() 함수를 사용한다.
  useSelector() 함수는 리덕스 스토어의 상태를 조회하는 함수이며, useDispatch() 함수는 리덕스 스토어의 dispatch() 함수를 사용할 수 있게 해주는 함수이다.
  
  - useSelector()는 커포넌트 내에서 애플리케이션의 상태를 받아서 자신이 원하는 상태 데이터를 선별(select)하는 용도로 사용한다.
  - useDispatch()는 리듀서를 통해 만들어진 새로운 애플리케이션의 상태를 반영하기 위해 사용한다. 예를 들어 로그인이 처리되면 useDispatch()를 이용해 새로운 애플리케이션 상태를
    반영한다.배포(dispatch)하는 경우에 사용한다.


  useSelector()는 파라미터로 함수를 지정한다. 이 함수를 이용해서 전달되는 애플리케이션 상태 중에 필요한 상태를 골라서 사용한다.
    이 프로젝트에서는 loginSlice라는 이름으로 스토어에 등록 돼 있다.
    
    const loginState = useSelector(state => state.loginSlice)
    
    이 코드는 스토어의 상태 중에서 loginSlice에 해당하는 상태를 loginState라는 변수에 저장한다.
    이제 loginState를 이용해서 로그인 상태를 확인하거나 변경할 수 있다.



*/
