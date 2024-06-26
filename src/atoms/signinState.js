import { atom } from "recoil";
import { getCookie } from "../util/cookieUtil";

const initState = {
    email: "",
    nickname: "",
    social: false,
    accessToken: "",
    refreshToken: "",
}


const loadMemberCookie = () => {    //쿠키에서 체크
 
    // 쿠키에서 회원 정보를 가져온다.
    const memberInfo = getCookie("member");

    // 닉네임 처리
    if(memberInfo && memberInfo.nickname) {
     memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    }

    return memberInfo;

    /**
        새로 고침 시 로그인한 모든 정보가 사라지는 현상을 방지하기 위해 쿠키를 사용한다.
        쿠키에 저장된 회원 정보를 불러와서 상태로 사용한다. 
    
        만약 쿠키에 저장된 회원 정보가 있다면 이를 반환하고, 없다면 초기 상태를 반환한다.
     */


}







const signinState = atom({
    key: "signinState",
    default: loadMemberCookie() || initState,
})

export default signinState;


/*
    리코일 라이브러리를 이해하기 위해서는 Atoms와 useRecoilState()를 이해해야 한다.
    Atoms는 리코일을 통해 보관하고 싶은 데이터를 의미한다.


    리덕스가 애플리케이션 당 하나의 상태를 유지하는 것과 달리 리코일은 여러 개의 Atoms를 만들고,
    컴포넌트들은 자신이 원하는 상태를 선별적으로 접근해서 사용하는 방식이다.

    useRecoilState()는 useState()의 확장판이라고 생각하면 된다.

    useRecoilState()의 파라미터에는 Atoms를 넣어서 사용한다.
    이를 통해서 useState()처럼 애플리케이션 내 공유되는 데이터를 접근, 변경할 수 있다.

-----------------------------------------------------------------------------------------------


    atom은 쉽게 말해 상태를 의미한다.
    리코일에서는 atom()을 이용해서 상태를 만들 수 있다.
    atom()은 key와 default를 파라미터로 받는다.
    key는 상태를 식별하는 키이고, default는 초기값을 의미한다.

    useRecoilState()는 리코일에서 상태를 사용하는 함수이다.
    리액트의 useState()와 비슷하다.
    useState()는 컴포넌트 내에서 상태를 관리하는 반면 useRecoilState()는 전역적으로 상태를 관리한다.
    atom()으로 만든 상태를 useRecoilState()를 통해 사용할 수 있다.
    예를 들면,
    
    const [signin, setSignin] = useRecoilState(signinState);
    이렇게 사용할 수 있다.

    위의 코드는 signinState라는 atom을 만들고, 이를 useRecoilState()를 통해 사용하고 있다.
    signinState는 초기값이 initState로 설정되어 있다.
    setSignin()을 통해 상태를 변경할 수 있다.

-----------------------------------------------------------------------------------------------

Atom은 공유하고 싶은 데이터를 atom()을 이용해서 생성하고, 컴포넌트에서는 이를 구독한다.
Atom으로 유지되는 데이터가 변경되면 이를 구독하는 컴포넌트들은 다시 렌더링이 이루어진다.

Atom을 생성할 때는 key 속성과 default 속성을 이용해서 초기값을 설정한다.


리코일 역시 많은 종류의 훅들을 제공한다. useRecoilState()는 그 중에서 가장 기본이 되는 훅으로,
useState()와 유사하지만 상태 유지의 범위가 애플리케이션 전체라고 생각하면 된다.
useRecoilState()를 읽고, 쓰는 용도로 사용한다면 이를 구분해서 사용하는 훅들도 존재한다.

- useRecoilValue(): 읽기 전용으로 사용
- useSetRecoilState(): 쓰기 전용으로 사용
- useResetRecoilState(): 초기화 전용으로 사용
- useRecoilCallback(): 비동기 처리를 위한 훅
- useRecoilTransactionObserver_UNSTABLE(): 트랜잭션 처리를 위한 훅
- useRecoilSnapshot(): 스냅샷 처리를 위한 훅
- useRecoilInterface_UNSTABLE(): 인터페이스 처리를 위한 훅
- useRecoilStateLoadable(): 상태 로딩을 위한 훅
- useRecoilCallback(): 콜백 처리를 위한 훅
- useRecoilValueLoadable(): 값 로딩을 위한 훅


*/