import React from "react";
import { useHistory } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import bounsel from "../../Img/logo_web_upv-1 (1).png";
import { connect } from "react-redux";
import { LOGOUT } from "../../Redux/type";

const Header = (props) => {
  let history = useHistory();
  const takeMe = (were) => {
    history.push(were);
  };

  const LogOut = () => {
    props.dispatch({ type: LOGOUT });
  };

  if (props.credentials?.token === "") {
    return (
      <div className="bodyNavBar">
        <Navbar bg="navBackGround" sticky="top" expand="lg" collapseOnSelect>
          <Navbar.Brand>
            <img
              onClick={() => takeMe("/")}
              className="bounsel"
              src={bounsel}
              alt="bounsel"
            ></img>
          </Navbar.Brand>
          <NavbarToggle />
          <NavbarCollapse>
            <Nav className="BtnLogin">
              <Nav.Link onClick={() => takeMe("/login")}>
                <p id="Iniciales">LOGIN</p>
              </Nav.Link>
            </Nav>
            <Nav className="BtnRegister BtnLogin">
              <Nav.Link onClick={() => takeMe("/registro")}>
                <p id="Iniciales">Sing Up</p>
              </Nav.Link>
            </Nav>
          </NavbarCollapse>
        </Navbar>
      </div>
    );
  } else {
    const primeraLetra = props.credentials.data?.user.name.charAt(0);
    const segundaLetra = props.credentials.data?.user.lastName.charAt(0);
    return (
      <div className="bodyNavBar">
        <Navbar bg="navBackGround" sticky="top" expand="lg" collapseOnSelect>
          <Navbar.Brand>
            <img
              onClick={() => takeMe("/")}
              className="bounsel"
              src={bounsel}
              alt="bounsel"
            ></img>
          </Navbar.Brand>
          <NavbarToggle />
          <NavbarCollapse>
          <Nav>
              <Nav.Link
                className="costumerBTN"
                onClick={() => takeMe("/profile")}>
                  <p id="Iniciales">{`${primeraLetra.toUpperCase()} ${segundaLetra.toUpperCase()}`}</p>
                  
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="BtnLogin LogOutBTN" onClick={() => LogOut()}>
                <p id="Iniciales">LOGOUT</p>
              </Nav.Link>
            </Nav>
          </NavbarCollapse>
        </Navbar>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Header);
