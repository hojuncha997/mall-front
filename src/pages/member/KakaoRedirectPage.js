import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAcccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();

  const authCode = searchParams.get("code");

  useEffect(() => {
    // authCode를 이용하여 accessToken을 가져온다.
    getAcccessToken(authCode).then((accessToken) => {
      console.log(accessToken);

      // accessToken을 이용하여 사용자 정보를 가져온다.
      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log("------------------------");
        console.log(memberInfo);
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
