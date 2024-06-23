import { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getCartItemsAsync } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();

  const { cartItems, refreshCart, changeCart } = useCustomCart();

  //   const dispatch = useDispatch();

  //   const cartItems = useSelector((state) => state.cartSlice);

  useEffect(() => {
    if (isLogin) {
      // 만약 로그인 한 상태라면 리듀서인 cartSlice에 정의된 getCartItemsAsync 함수를 호출한다.
      // 이 함수는 장바구니 목록을 가져오는 API를 호출한다.
      //   dispatch(getCartItemsAsync());
      refreshCart();
    }
  }, [isLogin]);

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex flex-col">
          <div className="flex w-full">
            <div className="font-extrabold text-2xl w-4/5">
              {loginState.nickname}'s Cart
            </div>
            <div className="bg-orange-600 text-center text-white font-bold w-1/5 rounded-full m-1">
              {cartItems.length}
            </div>
          </div>

          <div>
            <ul>
              {cartItems.map((item) => (
                <CartItemComponent
                  {...item}
                  key={item.cino}
                  changeCart={changeCart}
                  email={loginState.email}
                />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartComponent;
