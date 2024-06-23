import { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getCartItemsAsync } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartSlice);

  useEffect(() => {
    if (isLogin) {
      // 만약 로그인 한 상태라면 리듀서인 cartSlice에 정의된 getCartItemsAsync 함수를 호출한다.
      // 이 함수는 장바구니 목록을 가져오는 API를 호출한다.
      dispatch(getCartItemsAsync());
    }
  }, [isLogin]);

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex">
          <div className="m-2 font-extrabold">{loginState.nickname}'s Cart</div>
          <div className="bg-orange-600 w-9 text-center text-white font-bold rounded-full m-2">
            {cartItems.length}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartComponent;
