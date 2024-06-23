import useCustomLogin from "../../hooks/useCustomLogin";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();

  return (
    <div className="w-full">
      {isLogin ? <div>{loginState.nickname}'s Cart</div> : <></>}
    </div>
  );
};

export default CartComponent;
