import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { LOGIN } from "../../Redux/type";
import { STARTIME } from "../../Redux/type";

import { Form, Button } from "react-bootstrap";
import { BiErrorAlt } from "react-icons/bi";
import moment from "moment";

require("dotenv").config();

const Login = (props) => {
  let history = useHistory();

  const EmailRegExp = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

  const PassWordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [startTime, setStartTime] = useState("");

  const [msgError, setMensajeError] = useState("");

  const [errorLogin, setErrorLogin] = useState({
    eEmail: "",
    ePassword: "",
    eIconEmail: "",
  });

  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {}, []);

  const logeame = async (e) => {
    e.preventDefault();

    const startLogin = moment().format("YYYY-MM-DD HH:mm:ss");
    setStartTime(startLogin);

    let body = {
      email: credentials.email,
      password: credentials.password,
    };
    //  envio axios
    axios
      .post("http://localhost:3002/auth/login", body)
      .then(handleResponse)
      .catch((error) => {
        console.alert("No se ha podido realizar el logueo");
        setMensajeError(error);
      });
  };
  const handleResponse = (res) => {
    props.dispatch({ type: STARTIME, payload: startTime });

    setTimeout(() => {
      props.dispatch({ type: LOGIN, payload: res.data });
    }, 100);
  };

  const checkLogin = (arg) => {
    switch (arg) {
      case "email":
        if (!EmailRegExp.test(credentials.email)) {
          setErrorLogin({
            ...errorLogin,
            eEmail: "El email introducido no es valido ejemplo@ejemplo.com",
            eIconEmail: <BiErrorAlt />,
          });
        } else {
          setErrorLogin({ ...errorLogin, eEmail: "" });
        }
        break;
      case "password":
        if (!PassWordRegExp.test(credentials.password)) {
          setErrorLogin({
            ...errorLogin,
            ePassword:
              "La contraseña debe contener como mínimo 8 caracteres, mayúsculas, minúsculas, un número",
            eIconPassword: <BiErrorAlt />,
          });
        } else {
          setErrorLogin({ ...errorLogin, ePassword: "" });
        }
        break;
      default:
        break;
    }
  };

  if (!props.credentials.data?.token) {
    return (
      <div className="body">
        <div className="FormCard">
          <div className="AlingForm">
            <Form>
              <h1 id="Logintitle">login</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onBlur={() => checkLogin("email")}
                  onChange={updateCredentials}
                />
                <div className="errorIcon">{errorLogin?.eIconEmail}</div>
                <div className="error">{errorLogin.eEmail}</div>

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onBlur={() => checkLogin("password")}
                  onChange={updateCredentials}
                  lenght="30"
                />
                <div className="errorIconP">{errorLogin.eIconPassword}</div>
                <div className="error">{errorLogin.ePassword}</div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="I agree with the terms and conditions"
                />
              </Form.Group>
              <Button
                className="BtnLogin1"
                type="submit"
                onClick={(e) => logeame(e)}
              >
                Login
              </Button>

              <div className="error">{msgError}</div>
            </Form>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="hola">{history.push("/")}</div>;
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  TIMERreducer: state.TIMERreducer,
}))(Login);
