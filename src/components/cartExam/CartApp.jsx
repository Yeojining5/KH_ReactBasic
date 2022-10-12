import React, { useState } from "react";
import CartTents from './CartTents';
import "../../tent.css";
import { Button } from 'react-bootstrap';
import axios from "axios";
import CartAddForm from './CartAddForm';
import products from "../../product";


const CartApp = () => {

  const [items, setItems] = useState([
    {id:1, title:"텐트-1", count:0},
    {id:2, title:"텐트-2", count:0},
    {id:3, title:"텐트-3", count:0}
  ]);

  console.log(items)

  const cartPlus = (tent) => {
    const index = items.indexOf(tent)
    items[index].count += 1
    setItems([...items])
  }

  const cartMinus = (tent) => {
    const index = items.indexOf(tent)
    const count = items[index].count -1
    items[index].count = count < 0 ? 0 : count
    setItems([...items])
  }

  const cartDelete = (tent) => {
    // filter -> 특정 조건을 만족하는 새로운 배열을 필요로 할 때
    const tents = items.filter((item) => item.id != tent.id)
    setItems([...tents])
  }
  
  const cartAdd = () => {
    axios.get("/tents.json").then((result) => {
      console.log(result.data);
      const copy = [...items, ...result.data]
      setItems(copy)
    })
  }

  const inputCartAdd = (title) => {
    const tents = [...items, {id: Date.now(), title, count:0}] // title:title 이거를 title로 생략 가능
    setItems([...tents])
  }

  return (
    <>
      <h3>연습문제(CarApp)</h3>
      <hr />
      {/* 넘겨야 props에서 받음 */}
      <CartTents 
        items={items} 
        cartPlus={cartPlus} 
        cartMinus={cartMinus} 
        cartDelete={cartDelete} 
        inputCartAdd={inputCartAdd}
        /> 

        <hr />
        현재 상품 목록 수는 {items.length}
        <br/>
        현재 카트에 추가된 상품 수는 {" "}
        {items.filter((item) => item.count > 0).length}
        <br/>

        <Button onClick={cartAdd}>상품추가</Button>
      
    </>
  );
}

export default CartApp;