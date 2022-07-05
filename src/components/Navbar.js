import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Nav() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://cdn.dribbble.com/users/22/screenshots/9796993/media/ac48d5af6ba47adc1256aa4f5b6d426e.png?compress=1&resize=1000x750&vertical=top"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Token Exchange
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;
