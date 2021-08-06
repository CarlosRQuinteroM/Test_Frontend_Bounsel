import React from "react";
import { useHistory } from "react-router-dom";
import { Nav, Navbar} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import bounsel from '../../Img/logo_web_upv-1 (1).png'
const Header = (props) => {
  let history = useHistory();
  const takeMe = (were) => {
    history.push(were);
  };

  return (
    <div className="bodyNavBar">
        <Navbar bg="navBackGround" sticky="top" expand="lg" collapseOnSelect>
          <Navbar.Brand>
            <img onClick={() =>takeMe('/')} className="bounsel" src={bounsel} alt="bounsel"></img>
          </Navbar.Brand>
          <NavbarToggle/>
          <NavbarCollapse>
            <Nav className="BtnLogin">
              <Nav.Link onClick={() => takeMe("/login")}><p id="Iniciales">LOGIN</p></Nav.Link>
            </Nav>
            <Nav className='BtnRegister BtnLogin' >
              <Nav.Link  onClick={() => takeMe("/registro")}>
                <p id="Iniciales">Sing Up</p>
              </Nav.Link>
            </Nav>
          </NavbarCollapse>
        </Navbar>
      </div>
  );
};

export default Header;
