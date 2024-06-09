import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const loading = <div>Loading...</div>;
const TodoList = lazy(() => import("../pages/todo/ListPage"));

const todoRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={loading}>
          <TodoList />
        </Suspense>
      ),
    },

    {
      // 리다이렉션
      path: "",
      element: <Navigate replace to="list" />,
    },
  ];
};

export default todoRouter;
