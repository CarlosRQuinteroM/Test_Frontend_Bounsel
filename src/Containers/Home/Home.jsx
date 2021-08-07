import React from "react";
import { connect } from "react-redux";
import SearchName from "../../Components/SearchName/SearchName";
// import ListTimes from '../../Components/ListTimes/ListTimes'

const Home = (props) => {

  if (props.credentials.data?.token) {
    return (
      <div className="body">
        <SearchName/>
        {/* <ListTimes/> */}
      </div>
    );
  } else {
    return (
      <div className="body">
        <h1> Debes Iniciar sección para disfrutar de nuestro servicio </h1>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Home);
