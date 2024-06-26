import { useEffect , useMemo} from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getCartItemsAsync } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

// 리코일
import { useRecoilValue } from "recoil";
import { cartTotalState } from "../../atoms/cartState";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();

  // useCustomCart에 리코일을 적용하면서 refreshCart를 사용하지 않게 되었다.
  // const { cartItems, refreshCart, changeCart } = useCustomCart();
  const { cartItems, changeCart } = useCustomCart();

  // 리코일을 사용하여 cartTotalState를 가져온다. cartTotalState는 atoms/cartState.js에 정의되어 있다.
  const totalValue = useRecoilValue(cartTotalState);


  /*
  // 리코일을 사용하여 cartState에 있는 cartTotalState를 가져오기 때문에 아래와 같이 total을 계산할 필요가 없어졌다.

  const total = useMemo(() => {
    
    let total = 0;

    for(const item of cartItems) {
      total += item.price * item.qty;
    }
    return total;
  }, [cartItems]);

  */
  


  //   const dispatch = useDispatch();

  //   const cartItems = useSelector((state) => state.cartSlice);

  /*
  useEffect(() => {
    if (isLogin) {
      // 만약 로그인 한 상태라면 리듀서인 cartSlice에 정의된 getCartItemsAsync 함수를 호출한다.
      // 이 함수는 장바구니 목록을 가져오는 API를 호출한다.
      //   dispatch(getCartItemsAsync());
      refreshCart();
    }
  }, [isLogin]);
  */

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
          <div>
            <div className="text-3xl m-2">
              TOTAL: {totalValue}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartComponent;

/*

  장바구니의 모든 정보는 DB를 이용해서 보관되기 때문에 애플리케이션 내의
  상태 데이터로 관리하기보다는 컴포넌트 간 공유 데이터라고 보는 것이 더 적합한 설명이 될 수 있다.

  실제 장바구니의 구현의 유의점은 상품 정보의 수정과 삭제에 있다.
  
  - 삭제의 경우는 FK로 작성되기 때문에 서버에서 문제가 발생할 수 있다.

  - 상품의 이름이나 가격을 수정하는 경우는 사정이 다르다.
    상품 가격이 수정되었다면 현재 해당 상품을 장바구니에 담은 모든 사용자는
    장바구니 내에 존재하는 상품 가격이 실시간으로 변동되어야 할까?
    이는 상당히 중요한 문제이다. 상품 자체가 불변 데이터라면 완벽하겠지만 이는 변경되지 않는 것을 상정하기 때문에 논외이다.

    이에 대한 절충안은 약간의 시간(5분/10분)을 두고 자동으로 갱신되도록 하는 것이다.
    최근 개발에서는 다양한 라이브러리를 이용해 일정 시간 동안만 리액트에서 데이터를 캐싱하는
    기능들을 구현할 수 있다.

    만약 최대한 실시간에 가깝게 데이터를 처리해야 한다면, 현재로서는 Firebase와 같은
    실시간 데이터베이스를 사용하는 것이 가장 좋은 방법이 될 수 있다.

    

*/