import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {fetchProjects,deleteProject} from '../redux/projects'
import { Link } from "react-router-dom"

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  
  componentDidMount() {
    this.props.getProjects()
  }

  render() {
    
    
    return (
      <div>
         <div className="topBar">
          <h1>ALL Projects</h1>
          <Link to="/project/create"><button className="addRobotBtn">Add Project</button></Link>
        </div>
        <div className="allRobots">
        {
          this.props.projects.map(project => {
            return (
              <div key={project.id} className="robot">
                <Link to={`/project/${project.id}`}><h3>{project.title}</h3></Link>
                <div>
                  <h5>{`deadline:  ${project.deadline===null||project.deadline===undefined?project.deadline:project.deadline.slice(0,10).replace(/-/g,'/')}`}</h5>
                  <h5>{`completed:  ${project.completed ? "Yes":"No"}`}</h5>
                  <h5>{`priority:  ${project.priority}`}</h5>
                  <div className="robotName">
                    <button onClick={()=>this.props.deleteProject(project.id)}>x</button>
                  </div>
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
    projects: state.projects
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProjects: () => dispatch(fetchProjects()),
    deleteProject: (id)=>dispatch(deleteProject(id))
  };
}

export default connect(mapState, mapDispatch)(AllProjects);