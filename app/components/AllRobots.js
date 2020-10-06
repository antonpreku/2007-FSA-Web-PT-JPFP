import React from 'react';
import { connect } from 'react-redux';
import {fetchRobots,deleteRobot} from '../redux/robots'
import {Link} from "react-router-dom"

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends React.Component {


  componentDidMount(){
    this.props.getRobots()
  }

  render(){
    return (
      <div>
        <div className="topBar">
          <h1>ALL ROBOTS</h1>
          <Link to="/robots/create"><button className="addRobotBtn">Add Robot</button></Link>
        </div>
        <div className="allRobots">
          {
            
          this.props.robots.map(robot => {
            return (
            <div  key = {robot.id} className="robot">
              <img src={robot.imageUrl}></img>
              <div className="robotName">
              <h3>Name:<Link to={`/robots/${robot.id}`}>{robot.name}</Link></h3>
                <h5>{`Fuel Type:  ${robot.fuelType}`}</h5>
                <h5>{`Fuel Level:  ${robot.fuelLevel}`}</h5>
                <button onClick={()=>this.props.deleteRobot(robot.id)}>x</button>
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
  console.log(state.robots);
  
  return {
    robots: state.robots
  }
}
const dp = (dispatch) => {
  return {
    getRobots: () => dispatch(fetchRobots()),
    deleteRobot:(id)=>dispatch(deleteRobot(id))
  }
}

export default connect(mapState, dp)(AllRobots);
