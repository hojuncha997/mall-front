const rest_api_key = `ec922083d15a70f8304f17b2e289e21e`; // REST 키 값
const redirect_uri = `http://localhost:3000/member/kakao`;

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL;
};
