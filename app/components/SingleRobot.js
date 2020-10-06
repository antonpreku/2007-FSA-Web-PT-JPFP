import React from 'react';
import { connect } from 'react-redux';
import {getRobot} from '../redux/robots'
import {Link} from "react-router-dom"


export class SingleRobot extends React.Component {
  constructor(){
    super();
    this.state={
      projects:[0]
    }
  }
  componentDidMount(){
    this.props.getRobot(this.props.match.params.id)
  }
  componentDidUpdate(){
    if(this.state.projects[0] === 0){
      this.setState({projects:this.props.robot.projects})
    }
  }

  render(){
      const {robot}= this.props
    return (
      <div id="oneRobot">
            <div className="singleRobot">
                <img src={robot.imageUrl}/>
              <div>
                <div>
                  <h3>{`Robot:  ${robot.name}`}</h3>
                  <h5>{`Fuel Type:  ${robot.fuelType}`}</h5>
                  <h5>{`Fuel Level:  ${robot.fuelLevel}`}</h5>
                </div>
                <Link to={`/robots/edit/${robot.id}`}><button>Edit</button></Link>
              </div>
            </div>
            <h5>Projects assigned to {robot.name}</h5>
              <div id="robotProject">
                {
                  this.state.projects.map(project=>{
                    return(
                      <div key={project.id} className="robot">
                        <h3>{project.title}</h3>
                        <div>
                          <h5>{`deadline:  ${project.deadline}`}</h5>
                          <h5>{`completed:  ${project.completed}`}</h5>
                          <h5>{`priority:  ${project.priority}`}</h5>
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
    robot: state.robots
  }
}
const dp = (dispatch) => {
  return {
    getRobot: (id) => dispatch(getRobot(id))
  }
}

export default connect(mapState, dp)(SingleRobot);
