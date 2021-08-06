import {BrowserRouter, Route , Switch} from 'react-router-dom'
import './App.scss';
import Header from './Components/Header/Header';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import SearchTime from './Containers/SearchTime/SearchTime';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>


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
