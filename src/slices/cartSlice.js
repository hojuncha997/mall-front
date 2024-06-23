import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItems, postChageCart } from "../api/cartApi";

// createThunk의 역할은 비동기 처리를 하는 함수를 생성하는 것이다. 아래 함수의 역할은 장바구니 목록을 가져오는 API를 호출하는 것이다.
export const getCartItemsAsync = createAsyncThunk("getCartItemsAsync", () => {
  return getCartItems();
});

// 장바구니에 상품을 추가/수량변경 하는 API를 호출하는 비동기 함수를 생성한다.
export const postChageCartAsync = createAsyncThunk(
  "postChangeCartAsync",
  (param) => {
    return postChageCart(param);
  }
);

const initState = [];

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState,

  //extraReducers의 역할은 원래 reducer에 정의된 action 이외에 추가적인 action을 처리하는 것이다. 여기서는 getCartItemsAsync.fulfilled action을 처리한다.
  // getCartItemsAsync.fulfilled action은 getCartItemsAsync 함수가 성공적으로 호출되었을 때 발생하는 action이다.
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        console.log("getCartItemsAsync fulfilled");
        return action.payload;
      })
      .addCase(postChageCartAsync.fulfilled, (state, action) => {
        console.log("postChageCartAsync fulfilled");
        return action.payload;
      });
  },
});
export default cartSlice.reducer;

// 이 슬라이스에는 리듀서 함수가 있을까? 그 답은 없다. 왜냐하면 extraReducers에 정의된 action을 처리하는 함수가 리듀서 함수의 역할을 하기 때문이다.
// 굳이 리듀서 함수를 만들지 않고 extraReducers에 정의한 이유는 createSlice 함수가 액션과 리듀서 함수를 한 번에 정의할 수 있기 때문이다.
// 따라서 리듀서 함수를 따로 만들지 않아도 된다.
// 이렇게 createSlice 함수를 사용하면 코드를 간결하게 작성할 수 있다.

/*
    장바구니의 경우 초기 상태는 빈 배열을 이용한다.

    장바구니 상태는 로그인과 달리 모든 데이터가 API서버에 의존한다. 로그인을 한 순간 API서버로부터 현재 사용자의 장바구니 아이템들을 가져오고,
    사용자가 리액트 화면에서 변경하면 즉각적으로 서버와 동기화 할 필요가 있다. 만일 유지하려는 상태 데이터가 상대적으로 덜 중요하다고 판단된다면
    서버와의 동기화를 하지 않고 클라이언트에서만 유지할 수도 있다.

    예를 들어 대부분의 쇼핑몰들은 고객이 최근에 본 상품 목록의 경우 쿠키나 로컬 스토리지를 이용하여 보관한다.
    그러나 해당 데이터의 중요성이 높다고 판단된다면 반드시 데이터 베이스에 저장해야 한다.
*/
