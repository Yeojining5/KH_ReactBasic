import React from "react";

const CartTent = (props) => {

  const cartPlus = () => {
    props.cartPlus(props.tent)

  }
  const cartMinus = () => {
    props.cartMinus(props.tent)

  }
  const cartDelete = () => {
    props.cartDelete(props.tent)
  }

  
  console.log(props.tent)
  return (
    <>
      <div>상품로우값(CartTent)</div>

      <li className="li-tent">
        <span className="span-title">{props.tent.title}</span>
        <span className="span-count">{props.tent.count}</span>
        <button className="tent-button" onClick={cartPlus}>
          <span>➕</span>
        </button>
        <button className="tent-button" onClick={cartMinus}>
          <span>➖</span>
        </button>
        <button className="tent-button" onClick={cartDelete}>
          <span>🗑</span>
        </button>
      </li>
      <hr />
    </>
  );
}

export default CartTent;