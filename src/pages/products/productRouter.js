import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const ProductsRouter = () => {
  const Loading = <div>Loading...</div>;
  const ProductsList = lazy(() => import("../products/ListPage"));

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
  ];
};

export default ProductsRouter;
