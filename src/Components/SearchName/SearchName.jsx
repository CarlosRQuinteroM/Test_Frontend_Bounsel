import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

const SearchName = (props) => {

    const [ searchId, setSearchId] = useState('');


  const [TimeUsers, setTimeUsers] = useState([]);

  const updateId = (e) => {
      setSearchId(e.target.value);
  };

  useEffect(() => {
  }, []);

  const SearchDate = async (e) => {
      e.preventDefault();

    let id = searchId;
    console.log('THIS IS THE VALUE OF ID ', searchId)
    try {
      await axios.get(`http://[::1]:3002/time-reports/findone/${id}`)
      .then(res => setTimeUsers([...res.data]))
    } catch (error) {
      console.log(error);
    }
  };

  let name = props.credentials.data?.user.name;
  let lastName = props.credentials.data?.user.lastName;
  return (
      <div>
    <div className="FormCard">
      <div className="AlingForm">
        <Form onSubmit={(e)=> SearchDate(e)}>
          <h1 id="Logintitle">{`Hola ${name} ${lastName} puedes buscar! `}</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Add the User Id number</Form.Label>
              <Form.Control
                type="number"
                name="Id"
                placeholder="Id User"
                onChange={(e)=>updateId(e)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Label>From the date</Form.Label>
            <Form.Control
              type="Date"
              name="startDate"
            />
            <Form.Text className="text-muted">
              Add the start date search
            </Form.Text>
            <br></br>
            <br></br>
            <Form.Label>Until</Form.Label>
            <Form.Control
              type="Date"
              name="startDate"
              //  onBlur={() => checkLogin("email")}
              //   onChange={""}
            />
            <Form.Text className="text-muted">
              Add the End date search
            </Form.Text>
          </Form.Group>
          <Button
            className="BtnLogin1"
            type="submit"
            // onClick={() => SearchDate()}
          >
            Search
          </Button>
        </Form>
      </div>
    </div>
    <h1>HEY THIS WORKS {TimeUsers?.length}</h1>
    {TimeUsers?.map(timeuser => {
        return (
            <p>{timeuser.start_date} - {timeuser.end_date} ACTIVE TIME: {timeuser.total_time}</p>
        )
    })}
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(SearchName);
