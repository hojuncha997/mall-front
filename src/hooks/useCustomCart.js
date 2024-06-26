import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync, postChageCartAsync } from "../slices/cartSlice";

// 리액트 쿼리
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// 리코일
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartState";
import { getCartItems, postChageCart } from "../api/cartApi";



const useCustomCart = () => {

  const [cartItems, setCartItems] = useRecoilState(cartState);
  
  // 리액트 쿼리 사용
  const queryClient = useQueryClient();

  
  // 리액트 쿼리 사용
  const changeMutation = useMutation({
    mutationFn: (param) => postChageCart(param),
    onSuccess: (result) => {
      setCartItems(result);
    }
  })

  // 리액트 쿼리 사용
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartItems(),
    staleTime: 1000 * 60 * 60,  // 1시간
  });


  // 리액트 쿼리 사용: 쿼리가 성공하거나 changeMutation이 성공하면 cart를 다시 조회한다.
  useEffect(() => {
    if (query.isSuccess || changeMutation.isSuccess) {
      queryClient.invalidateQueries("cart");
      setCartItems(query.data);
    }
  }, [query.isSuccess, query.data]);

  const changeCart = (param) => {
    changeMutation.mutate(param);
  };

  return { cartItems, changeCart };
}

export default useCustomCart;








/*
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
*/