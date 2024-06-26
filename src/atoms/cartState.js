import { atom, selector } from "recoil";

export const cartState = atom({
    key: "cartState",
    default: []
})


export const cartTotalState = selector({
    key: "cartTotalState",
    get: ( {get} ) => {
        // get()을 이용해서 다른 atom이나 selector의 값을 가져올 수 있다.
        // cartState의 값을 가져와서 총액을 계산한다.
        const arr = get(cartState);
        
        const initialValue = 0;
        
        // reduce()를 이용해서 총액을 계산한다.
        const total  =  arr.reduce((total, current) => {
            return total + current.price * current.qty;
        }, initialValue);

        return total;
    }
})













/*
     cartState는 카트에 담긴 장바구니 아이템의 배열을 선언한다. 초기값은 빈 배열이다.

     -

     리코일의 Atom이 데이터 자체를 의미한다면 Selector는 데이터를 이용해서 처리할 수 있는 기능을 의미한다.
     예를 들어 장바구니 기능의 경우 해당 상품의 가격과 수량을 이용해서 전체 장바구니의 총액을 구하는 기능을 사용할 수 있다.

     리코일의 Selector는 데이터를 가공해서 원하는 기능을 제공하기 때문에 getter처럼 사용되지만,
     Atom으로 관리되는 데이터를 변경하는 setter의 기능도 제공한다.


*/

