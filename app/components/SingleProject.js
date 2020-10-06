import React from 'react';
import { connect } from 'react-redux';
import {getProject} from '../redux/projects'
import {Link} from "react-router-dom"


export class SingleProject extends React.Component {
  constructor(){
    super();
    this.state={
      robots:['0']
    }
  }
  componentDidMount(){
    this.props.getProject(this.props.match.params.id)
  }
  componentDidUpdate(){
    if(this.state.robots[0] === '0'){
      this.setState({robots: this.props.project.robots})
    }
  }

  render(){
      const {project}= this.props 
    return (
      <div id="oneRobot">  
            <div className="singleRobot"> 
              <p>{project.description}</p>
              <div>
                <h3>{project.title}</h3>
                <h5>{`deadline:  ${project.deadline===null||project.deadline===undefined?project.deadline:project.deadline.slice(0,10).replace(/-/g,'/')}`}</h5>
                <h5>{`completed:  ${project.completed ? "Yes":"No"}`}</h5>
                <h5>{`priority:  ${project.priority}`}</h5>
                <Link to={`/project/edit/${project.id}`}><button>Edit</button></Link>
              </div>
            </div>          
            <h5>Robots assigned to {project.title}</h5>  
            <div id="robotProject">
                {
                  this.state.robots.map(robot =>{
                    return(
                      <div  key = {robot.id} className="project">
                        <img src={robot.imageUrl}></img>
                        <div className="robotName">
                          <h3>Name:{robot.name}</h3>
                          <button>Unassign</button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>             
      </div> 
    )
  }
}

const mapState = (state) => {      
  return {
    project: state.projects
  }
}
const dp = (dispatch) => {
  return {
    getProject: (id) => dispatch(getProject(id))
  }
}

export default connect(mapState, dp)(SingleProject);
