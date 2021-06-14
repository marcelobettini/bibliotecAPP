import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Listado from "./components/Listado";

function App() {
  return (
    
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
        <Switch>
          <Route path="/login" component={Login}></Route>
        </Switch>
        <Switch>
          <Route path="/admin" component={Admin}></Route>
        </Switch>
        <Switch>
          <Route path="/listado" component={Listado}></Route>
        </Switch>
      </BrowserRouter>        
  );
}

export default App;
