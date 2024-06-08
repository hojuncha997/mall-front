import { Suspense, lazy } from "react";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";

// createBrowserRouter()를 통해 특정 경로에 대응되는 컴포넌트를 설정한다.
// 경로추가는 파라미터로 전달된느 배열의 내용물로 결정된다.
// 이를 처리하기 위해 실행 시 가장 먼저 실행되는 App.js파일을 수정한다.

// Suspense와 Lazy()는 필요한 순간까지 컴포넌트를 메모리에 올리지 않도록 지연로딩을 위해 사용한다.
// 컴포넌트의 처리가 끝나지 않은 경우 화면에 로딩 Loading을 보여준다.

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
]);

export default root;
