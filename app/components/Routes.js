import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch,NavLink } from 'react-router-dom';
import AllProjects from './AllProjects';
import AllRobots from './AllRobots'
import SingleRobot from './SingleRobot'
import NewRobot from "./NewRobot"
import EditRobot from "./EditRobot"
import NewProject from "./NewProject"
import SingleProject from "./SingleProject"
import EditProject from "./EditProject"
import Home from "./Home"



const Routes = () => {
    return (
      <Router>
        <div>
          <div>
          <nav className="homeBar">
            <NavLink to ="/" className="homeBtn"> Home </NavLink>
            <div className="rightBtn">
              <NavLink to ="/robots" className="robotBtn"> All Robots </NavLink>
              <NavLink to ="/projects" className="projectBtn"> All Projects </NavLink>
            </div>
           
          </nav>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/project/create" component={ NewProject } />
            <Route exact path="/project/edit/:id" component={ EditProject } /> 
            <Route exact path="/project/:id" component={ SingleProject } /> 
            <Route exact path="/robots/create" component={ NewRobot } />
            <Route exact path="/robots/edit/:id" component={ EditRobot } />
            <Route exact path="/robots" component={ AllRobots } />
            <Route exact path="/projects" component={ AllProjects } />
            <Route exact path="/robots/:id" component={ SingleRobot } />
          </Switch>
          </div>
        </div>
      </Router>
    );
}


export default Routes