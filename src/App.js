import {BrowserRouter, Route , Switch} from 'react-router-dom'
import './App.scss';
import Home from './Containers/Home/Home';
import SearchTime from './Containers/SearchTime/SearchTime';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>

        <Route path="/" exact component={Home}/>
        <Route path='/timereport' exact component={SearchTime}/>
      </Switch>
      
      </BrowserRouter>
  
    </div>
  );
}

export default App;
