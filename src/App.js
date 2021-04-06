import './App.scss';
import Header from "./components/Header/Header"
import Fotter from "./components/Footer/Footer"
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import ToDo from './components/Todo/ToDo';

function App() {
  return (
    <div className="main-container">
      <Header />
      <div className="page-body">
        <Switch>

          <Route path="/" exact>
            <Login />
          </Route>

          <Route path="/todo" exact>
            <ToDo />
          </Route>

          <Route path="/todo/:searchText" exact>
            <ToDo />
          </Route>
          
        </Switch>
      </div>
      <Fotter />
    </div>
  )
}

export default App;
