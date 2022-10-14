import React from "react";
import { Navbar } from "react-bootstrap";

const HackerFooter = () => {
  return (
    <>
      <Navbar
        className="navbar navbar-expand-sm justify-content-center"
        fixed="bottom"
        bg="dark"
        style={{ color: "white" }}
      >
        News & Youtube Copyright &copy; 2022
      </Navbar>
    </>
  );
};

export default HackerFooter;
