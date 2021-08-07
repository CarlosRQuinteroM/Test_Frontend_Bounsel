import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import bounsel from "../../Img/logo_web_upv-1 (1).png";
import { connect } from "react-redux";
import { LOGOUT } from "../../Redux/type";
import { ENDTIME } from "../../Redux/type";
import moment from "moment";
import axios from "axios";

const Header = (props) => {
  let history = useHistory();
  const takeMe = (were) => {
    history.push(were);
  };
  useEffect(() => {}, []);

  const defLogFunc = () => {
    let catchEndTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const token = props.credentials?.data.token;

    let body = {
      start_date: props.startTime,
      end_date: moment(catchEndTime),
      total_time: "2021-05-05 10:10:50.452708000",
    };
    axios
      .post("http://[::1]:3002/time-reports/create", body, {
        headers: { Authorization: "Bearer " + token },
      })
      .then()
      .catch((err) => console.error(err));
  };

  window.addEventListener("unload", defLogFunc);

  const LogOut = async (e) => {
    e.preventDefault();

    let catchEndTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const token = props.credentials?.data.token;

    let body = {
      start_date: props.startTime,
      end_date: moment(catchEndTime),
      total_time: "2021-05-05 10:10:50.452708000",
    };

    axios
      .post("http://[::1]:3002/time-reports/create", body, {
        headers: { Authorization: "Bearer " + token },
      })
      .then()
      .catch((err) => console.error(err));

    props.dispatch({ type: ENDTIME });

    setTimeout(() => {
      props.dispatch({ type: LOGOUT });
    }, 1000);
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
                <p id="Iniciales">Login</p>
              </Nav.Link>
            </Nav>
            <Nav className="BtnRegister BtnLogin">
              <Nav.Link onClick={() => takeMe("/registro")}>
                <p id="Iniciales">Sign Up</p>
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
                onClick={() => takeMe("/profile")}
              >
                <p id="Iniciales">{`${primeraLetra.toUpperCase()} ${segundaLetra.toUpperCase()}`}</p>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                className="BtnLogin LogOutBTN"
                onClick={(e) => LogOut(e)}
              >
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
  TIMEReducer: state.TIMEReducer,
}))(Header);
