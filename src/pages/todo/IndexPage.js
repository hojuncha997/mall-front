import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const IndexPage = () => {
  return (
    <BasicLayout>
      <div className="w-full flex m-2 p-2">
        <div className="text-xl p-2 w-20 font-extrabold text-center underline">
          LIST
        </div>
        <div className="text-xl  p-2 w-20 font-extrabold text-center underline">
          ADD
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        {/* Outlet 적용: 세밀한 레이아웃의 재사용 단위 구성 가능 */}
        <Outlet />
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
