import {BrowserRouter, Route , Switch} from 'react-router-dom'
import { useState, useEffect } from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import SearchTime from './Containers/SearchTime/SearchTime';
import moment from 'moment';

const App = () => {
  const [startTime, setStartTime] = useState('');

  useEffect(() => {
    console.log('hey!')
    const startTime = moment().format("YYYY-MM-DD HH:mm:ss");
    setStartTime(startTime)
  }, [])
  
  return (
    <div className="App">
      <BrowserRouter>
      <Header startTime={startTime}/>


      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path='/timereport' exact component={SearchTime}/>
        <Route path='/login' exact component={Login}/>
      </Switch>
      
      </BrowserRouter>
  
    </div>
  );
}

export default App;
