import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const ProductsRouter = () => {
  const Loading = <div>Loading...</div>;
  const ProductsList = lazy(() => import("../pages/products/ListPage"));
  const ProductsAdd = lazy(() => import("../pages/products/AddPage"));

  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ProductsList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/products/list" />, // 리다이렉트
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <ProductsAdd />
        </Suspense>
      ),
    },
  ];
};

export default ProductsRouter;
