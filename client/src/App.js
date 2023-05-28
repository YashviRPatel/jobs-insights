import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./components/Home";
import EachCompany from "./components/EachCompany";
import AllCompanies from "./components/AllCompanies";
import AllJobs from "./components/AllJobs";
import AllSalaries from "./components/AllSalaries";
import Prediction from "./components/Prediction";
import About from "./components/About";
import ForEmployers from "./components/ForEmployers";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/company/:slug" component={EachCompany} />
          <Route exact path="/companies" component={AllCompanies} />
          <Route exact path="/jobs" component={AllJobs} />
          <Route exact path="/salaries" component={AllSalaries} />
          <Route exact path="/prediction" component={Prediction} />
          <Route exact path="/about" component={About} />
          <Route exact path="/employers" component={ForEmployers} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
