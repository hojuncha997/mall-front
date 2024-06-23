import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync, postChageCartAsync } from "../slices/cartSlice";

const useCustomCart = () => {
  // useSelector() 함수를 이용해서 cartSlice의 상태를 조회한다.
  const cartItems = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();

  const refreshCart = () => {
    // 리듀서 함수인 getCartItemsAsync()를 호출한다. 이 리듀서의 위치는 cartSlice이다.
    dispatch(getCartItemsAsync());
  };

  const changeCart = (param) => {
    // 리듀서 함수인 postChageCartAsync()를 호출한다. 이 리듀서의 위치는 cartSlice이다.
    dispatch(postChageCartAsync(param));
  };

  return { cartItems, refreshCart, changeCart };
};

export default useCustomCart;
