import React from 'react';
import styled from "styled-components"

const PageUl = styled.ul`
  float: center;
  list-style: none;
  text-align: center;
  border-radius: 6px;
  color: white;
  padding: 1px;
  border-top: 3px solid #ffc444;
  border-left: 3px solid #ffc444;
  border-right: 3px solid #ffc444;
  border-bottom: 3px solid #ffc444;
  background-color: rgba(78, 77, 77, 0.4);
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 16px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #3db33d;
  }
  &:focus::after {
    color: white;
    background-color: #266c3b;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

const Mypagination = ({ newsPerPage, totalNews, paginate }) => {

  // 페이징 처리에 필요한 숫자를 담을 배열 선언
  // i=1 -> 페이지 번호 1부터 시작
  const pageNumbers = [];
  for(let i=1; i<=Math.ceil(totalNews/newsPerPage); i++){
    pageNumbers.push(i)
  }

  return (
    <>
      <PageUl>
        {
          pageNumbers.map((number, i) => (

            <PageLi>
              <PageSpan onClick={() => {
                console.log(number);
                paginate(number)
                }}>
                {number}
              </PageSpan>
            </PageLi>

        ))}
      </PageUl>
    </>
  );
};

export default Mypagination;