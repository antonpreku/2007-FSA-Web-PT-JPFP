import React, { Component } from "react"
import { connect } from "react-redux"
import{fetchProjects}from "../redux/projects"
import {getProject,updateProject} from '../redux/projects'


class EditProject extends Component{
    constructor(){
        super();
        this.state={
            title:'^',
            deadline:'',
            completed:'',
            priority:0,
            robots:[]
        }
        this.createProject=  this.createProject.bind(this)
        this.titleChenge= this.titleChenge.bind(this)
        this.completedChange= this.completedChange.bind(this)
        this.priorityChange= this.priorityChange.bind(this)
        this.deadlineChange= this.deadlineChange.bind(this)
        this.changeValue=this.changeValue.bind(this)
    }
    async componentDidMount (){
        await this.props.getProject(this.props.match.params.id)
      }
    componentDidUpdate(){
        if(this.state.title === '^'){
            this.setState({
                title: this.props.state.projects.title,
                deadline: this.props.state.projects.deadline,
                completed: this.props.state.projects.completed,
                priority: this.props.state.projects.priority,
                robots: this.props.state.projects.robots
            })
        }
    }
    
   
   
    titleChenge(ev){
        this.setState({title: ev.target.value})
    }completedChange(ev){
        this.setState({completed: ev.target.value})
    } priorityChange(ev){
        this.setState({priority: ev.target.value})
    } deadlineChange(ev){
        this.setState({deadline: ev.target.value})
    }

    createProject(ev){
        ev.preventDefault()
        this.props.updateProject( 
            this.props.history,
            this.props.match.params.id,
            this.state.title,
            this.state.completed,
            this.state.priority,
            this.state.deadline
        )
    }
    changeValue(){
        if(this.state.completed){          
            this.setState({completed: "No"})
        }else{
            this.setState({completed: "Yes"})          
        }
    }
    render(){   
        const {title,priority,completed,deadline,robots}=this.state
        return (
        <div>
            <div className="edit">
                <form onSubmit={this.createProject}>
                    <label>Project Title:</label> 
                    <input type="text" value={title} className={ title === "" ? "neccesary": "ok" } onChange={this.titleChenge}/><br></br>
                    <label>Completed:</label>
                    <input type="text" value={completed ? "Yes" : "No"} onChange={this.titleChenge}/>
                   <br></br>
                    <label>Priority:</label> 
                    <select onChange={this.priorityChange}>
                        <option value={priority}>{priority}</option>
                        <hr></hr>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select><br></br>
                    <label>Deadline:</label>
                    <input type="date" value={deadline} onChange={this.deadlineChange}/><br></br>
                    <button className="addRobotBtn" type="submit">Save Changes</button>
                </form>
                <button onClick={()=>this.changeValue()}>Mark {completed ? "Uncomplete" : "Complete"}</button>
            </div>
            <h5 id="h">Projects assigned to {title}</h5>
            <div id="editNewProject">
                <select >
                    {
                        // projects.map(project=>{
                        //     return(
                        //     <option key={project.id} value={project.title}>{project.title}</option>
                        //     )
                        // })
                    }                    
                </select>
                <button className="addRobotBtn">Add Robot</button>
            </div>
            <div id="robotProject">
                {
                  robots.map(robot =>{
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

export default connect(
    (state)=>{        
        return {
           state
        }
    },
    (dispatch) => {
        return {
            getProject: (id) => dispatch(getProject(id)),
            updateProject:(history,id,title,completed,priority,deadline)=>dispatch(
                updateProject(history,id,title,completed,priority,deadline)
            )
        }
    }
)(EditProject)