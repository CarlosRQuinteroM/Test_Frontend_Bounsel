import axios from 'axios';
import React ,{ useState , useEffect}  from 'react'
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

const SearchName = (props) => {

    const [TimeUsers, setTimeUser] = useState([]);
    console.log(TimeUsers);

 useEffect(() => {
    setTimeout(() => {
        SearchDate()
    }, 500);
 }, [])

   const SearchDate = async  () =>{
        let id = props.credentials.data?.user.id;
        let token = props.credentials.data?.token;
        console.log(token);
        try {
            let res = await axios.get(`http://[::1]:3002/time-reports/findone/${id}`)

            setTimeUser(res.data);
            
        } catch (error) {
            console.log(error)
        }

     

    }






    let name = props.credentials.data?.user.name;
    let lastName = props.credentials.data?.user.lastName;
    return (
        <div className="FormCard">
          <div className="AlingForm">
            <Form>
                <h1 id="Logintitle">{`Hola ${name} ${lastName} puedes buscar! `}</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <br/>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add the User Id number</Form.Label>
                <Form.Control
                  type="number"
                  name="ID"
                  placeholder="Id User"

                //   onChange={updateCredentials}
                />
                <Form.Text className="text-muted">
                  
                </Form.Text>
              </Form.Group>

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
                onClick={() => SearchDate()}
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
