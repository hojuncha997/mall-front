import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { removeCookie, getCookie, setCookie } from "../util/cookieUtil";

const initState = {
  email: "",
};

const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  // 닉네임 처리
  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }
  return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  // initialState: initState,
  initialState: loadMemberCookie() || initState, //  쿠키가 없다면 초깃값 사용
  reducers: {
    login: (state, action) => {
      console.log("login....");

      // {소셜로그인 회원이 사용}
      const payload = action.payload;

      setCookie("member", JSON.stringify(payload), 1); // 1일 동안 쿠키 보관

      return payload;
    },
    logout: (state, action) => {
      console.log("logout...");

      // 쿠키에 저장된 데이터를 삭제한다.
      removeCookie("member");

      // 상태를 초기화한다.
      return { ...initState };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("loginPostAsync.fulfilled");
        // API 서버에서 로그인 시에 전송되는 데이터들을 상태 데이터로 보관하도록 처리.
        const payload = action.payload;

        // 정상적인 로그인 시에만 쿠키 저장
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1); // 1일 동안 쿠키 보관
        }

        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("loginPostAsync.pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("loginPostAsync.rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

/*
    리듀서는 현재 스토어에 있는 애플리케이션의 상태를 가공하는 역항를 한다.

    컴포넌트들은 Action이라는 것을 이용해서 리듀서를 호출한다.
    리듀서에서는 액션의 payload값을 처리해서 앞으로 보관해야 할 상태 데이터를 반환한다.

    예전에는 리듀서에서 액션과 리듀서를 별도로 작성했지만 리덕스 툴킷에서는 slice라는 이름으로 한 번에 작성할 수 있다.
*/

/*
    loginSlice에는 애플리케이션이 유지해야 하는 상태와 이를 처리하기 위한 리듀서 함수들(login(), logout())을 정의할 수 있다.
    여기서는 email 속성을 가진 객체를 사용해서 email 값이 있는 경우에는 로그인한 상태로 간주하고,
    그렇지 않으면 로그인 되지 않은 상태로 간주한다.

    loginSlice 내부에 선언된 함수들을 외부에 노출하기 위해 export 처리한다.
    작성된 슬라이스는 store.js에 설정한다.
*/

/*
  리듀서 함수(login, logout)의 두 번째 파라미터는 action이다.
  action의 payload 속성을 이용해서 컴포넌트가 전달하는 데이터를 확인할 수 있다.
*/

/*
  useSelector()와 useDispatch()로 애플리케이션 상태를 이용할 때 필요한 또 다른 기능은 비동기 처리이다.
  API서버를 통해 로그인/로그아웃을 처리해야 하는 작업과 로그인 시에 API서버를 연동하려면 비동기 처리가 필요하다.

  과거 리덕스에서는 redux-thunk나 redux-saga와 같은 미들웨어를 사용했지만 리덕스 툴킷에서는 createAsyncThunk() 함수를 사용한다.
  createAsyncThunk() 함수는 비동기 처리를 위한 함수를 생성한다.
  이 함수는 액션을 생성하고, API서버와 통신하고, 결과를 처리하는 작업을 한다.

  loginSlice에서는 loginPostAsync라는 이름으로 createAsyncThunk() 함수를 생성한다.
  이 함수의 호출 결과에 따라 동작하는 extraReducers를 추가한다.
  extraReducers는 pending, fulfilled, rejected 세 가지 상태를 가진다.

  즉, createAsyncThunk()를 이용해서 memberApi.js에 선언된 loginPost() 함수를 호출하고,
  아래쪽에 비동기 통신의 상태에 따라 동작하는 함수를 작성하는 것이다.

*/
/*
  쿠키를 적용한 이후에는, loginSlice는 실행될 때 member 쿠키를 먼저 찾아보고 없는 경우에는 기본값을 가지도록 구성된다.
  애플리케이션이 초기화 될 때 loginSlice도 초기화 되지만, member 쿠키가 존재하는 상태에서는 새로고침을 해도 로그인 상태가 유지된다.

*/
