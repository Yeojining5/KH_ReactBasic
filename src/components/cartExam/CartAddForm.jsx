import React from "react";

// CartTent.jsx 파일에서 items 받아옴
const CartAddForm = (props) => {
  const formRef = React.createRef();
  const inputRef = React.createRef();
  const onSubmit = event => {
    event.preventDefault();
    const title = inputRef.current.value;
    title && props.inputCartAdd(title);
    formRef.current.reset();
  }

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit}>
        <input ref={inputRef} type="text" placeholder='상품추가' />
        <button>Add</button>
      </form>

    </>
  );
}

export default CartAddForm;