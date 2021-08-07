import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

const SearchName = (props) => {

  const [ searchId, setSearchId] = useState('');
  const [TimeUsers, setTimeUsers] = useState([]);
  const [filteredDates, setFilteredDates] = useState([]);
  const [ dates , SetDates]= useState({
    startDate:"",
    endDate:""
  })

  const updatedates = (e) => {
    SetDates({ ...dates, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    filterDates()
  }, [TimeUsers])

  const updateId = (e) => {
      setSearchId(e.target.value);
  };

  // accept start and end as arguments. 
  const filterDates = () => {
    const startD = moment(dates.startDate).format("YYYY-MM-DD");
    const start = new Date(startD)
    const endD = moment(dates.endDate).format("YYYY-MM-DD");
    const end = new Date(endD)
  
    const filtedDates = TimeUsers?.filter(date => {
     let dateOnly = new Date(date.start_date.substring(0, 10))
     return (dateOnly >= start && dateOnly <= end)
    })
    setFilteredDates([...filtedDates])
    console.log('THESE DATES ARE FILTERED IN STATE ', filteredDates)
  }

  const SearchDate = async (e) => {
      e.preventDefault();

    let id = searchId;
    try {
      await axios.get(`http://[::1]:3002/time-reports/findone/${id}`)
        .then(res => { setTimeUsers([...res.data])} )
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
              onChange={(e) => updatedates(e)}
            />
            <Form.Text className="text-muted">
              Add the start date search
            </Form.Text>
            <br></br>
            <br></br>
            <Form.Label>Until</Form.Label>
            <Form.Control
              type="Date"
              name="endDate"
                onChange={(e) => updatedates(e)}
            />
            <Form.Text className="text-muted">
              Add the End date search
            </Form.Text>
          </Form.Group>
          <Button
            className="BtnLogin1"
            type="submit"
          >
            Search
          </Button>
        </Form>
      </div>
    </div>
    <h1>Active Sessions:</h1>
    {filteredDates?.map(date => (
      <p key={date.id}>{date.start_date} - {date.end_date}</p>
    ))}
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(SearchName);
