import React from 'react'
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

const SearchName = (props) => {
    let name = props.credentials.data?.user.name;
    let lastName = props.credentials.data?.user.lastName;
    return (
      
        <div className="FormCard">
          <div className="AlingForm">
            <Form>
                <h1 id="Logintitle">{`Hola ${name} ${lastName} puedes buscar! `}</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <br></br><br></br>
              <Form.Label>From the date</Form.Label>
                <Form.Control
                  type="Date"
                  name="startDate"
                  //  onBlur={() => checkLogin("email")}
                  //   onChange={""}
                />
                <Form.Text className="text-muted">
                  Add the start date search
                </Form.Text>
                <br></br><br></br>
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
    )
}

export default connect((state)=> ({
    credentials:state.credentials
})) (SearchName)
