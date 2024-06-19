import useCustomLogin from "../hooks/useCustomLogin";
import BasicLayout from "../layouts/BasicLayout";

const AboutPage = () => {

  const {isLogin, moveToLoginReturn} = useCustomLogin();

  // 로그인이 되어 있지 않다면 로그인 페이지로 이동한다. useCustomLogin() 훅을 이용했기 때문에 코드가 간결해진다.
  if(!isLogin) {
    return moveToLoginReturn();
  }


  return (
    <BasicLayout>
      <div className="text-3xl">AboutPage</div>
    </BasicLayout>
  );
};
export default AboutPage;
