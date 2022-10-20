import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


// const HackerHeader = (props) => {
//   const { userId, onLogout } = props;     -> 구조분해 할당 버전
// userId, onLogout 이벤트 핸들러가 넘어옴
const HackerHeader = ({userId, onLogout}) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">News & Youtube</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/hackernews" className="nav-link">
                HackerNews
              </Link>
              <Link to="/dept" className="nav-link">
                DeptList
              </Link>
              <Link to="/youtube" className="nav-link">
                Youtube
              </Link>
              <Link to="/notice" className="nav-link">
                Notice
              </Link>
            </Nav>

            {
            onLogout &&
            (<Button variant="outline-light" onClick={onLogout}>
              Logout
            </Button>)
            }
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HackerHeader;
