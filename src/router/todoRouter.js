import { Suspense, lazy } from "react";

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
  ];
};

export default todoRouter;
