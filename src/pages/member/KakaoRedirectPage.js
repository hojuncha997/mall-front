import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAcccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import useCustomLogin from "../../hooks/useCustomLogin";

// API 서버에서 전송한 결과를 dispatch를 이용하여 login() 함수를 호출하여 상태를 변경한다.
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();

  const moveToPath = useCustomLogin;

  const dispatch = useDispatch();

  const authCode = searchParams.get("code");

  useEffect(() => {
    // authCode를 이용하여 accessToken을 가져온다.
    getAcccessToken(authCode).then((accessToken) => {
      console.log(accessToken);

      // accessToken을 이용하여 사용자 정보를 가져온다.
      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log("------------------------");
        console.log(memberInfo);
        dispatch(login(memberInfo)); // 이 결과로 쿠키가 생성된다.

        // 소셜 회원이 아니라면
        if (memberInfo && !memberInfo.social) {
          moveToPath("/");
        } else {
          moveToPath("/member/modify");
        }
      });
    });
  }, [authCode]);

  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
