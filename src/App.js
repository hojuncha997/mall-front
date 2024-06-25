import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();


function App() {
  return (
    // 리액트 쿼리의 기본적 설정은 애플리케이션 내에서 리액트 쿼리의 QueryClient를 지정하는 것으로 실천
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={root} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;



/*

쿼리 클라이언트 인스턴스를 생성할 때 아래와 같이 옵션을 넣어줄 수 있다.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      staleTime: 0,
    },
  },
});


...

// initialIsOpen 속성을 true로 설정하면 개발자 도구가 초기에 열린다.
<ReactQueryDevtools initialIsOpen={true} />


*/