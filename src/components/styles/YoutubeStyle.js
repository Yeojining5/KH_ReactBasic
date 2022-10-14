import styled from "styled-components"

export const VLUL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin: 0;
`

export const VRLI = styled.li`
  width: 50%;
  padding: 0.2em;
`

export const VRIMG = styled.img `
  width: 40%;
  height: 90%;
`

export const VRVIDEODIV = styled.div`
width: 100%;
height: 100%;
display: flex; /* 비디오가 한줄에 출력됨 */
align-items: center;
padding-left: 1rem;
border: 1px solid lightgray;
box-shadow: 3px 3px
cursor: pointer;
transition: transform 250ms ease-in;
&:hover {
  transform: scale(1.02);
}
`

export const VRCONTENTDIV = styled.div`
  margin-left: 1em;
`

export const VRPTITLE = styled.p`
  margin: 10;
  font-size: 1.2rem;
`

export const VRCHANNEL = styled.p`
  margin: 0;
  font-size: 1rem;
`

export const PreDescription = styled.pre`
  white-space: pre-wrap; /* 코드 줄바꿈 없어도 자동 줄바꿈 */
`


