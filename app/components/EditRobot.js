import React, { Component } from "react"
import { connect } from "react-redux"
import{fetchProjects}from "../redux/projects"
import {getRobot,updateRobot} from '../redux/robots'


class EditRobot extends Component{
    constructor(){
        super();
        this.state={
            name:'^',
            imageUrl:'',
            fuelType:'',
            fuelLevel:0,
            projects:[],
            allProjects:['0']
        }
        this.createRobot=  this.createRobot.bind(this)
        this.nameChange= this.nameChange.bind(this)
        this.fuelTypeChange= this.fuelTypeChange.bind(this)
        this.fuelLevelChange= this.fuelLevelChange.bind(this)
        this.imgChange= this.imgChange.bind(this)
    }
    async componentDidMount (){
        await this.props.getRobot(this.props.match.params.id)
        await this.props.getProjects()
      }
    componentDidUpdate(){
        if(this.state.name === "^"){
            this.setState({name:this.props.state.robots.name,
                imageUrl:this.props.state.robots.imageUrl,
                fuelType:this.props.state.robots.fuelType,
                fuelLevel:this.props.state.robots.fuelLevel,
                projects:this.props.state.robots.projects
            })
        }
    }
    componentWillUpdate(){
        if(this.state.allProjects[0]==='0'){
            this.setState({
                allProjects: this.props.state.projects
            })
        }
    }
   
    nameChange(ev){
        this.setState({name: ev.target.value})
    }fuelTypeChange(ev){
        this.setState({fuelType: ev.target.value})
    } fuelLevelChange(ev){
        this.setState({fuelLevel: ev.target.value})
    } imgChange(ev){
        this.setState({imageUrl: ev.target.value})
    }

    createRobot(ev){
        ev.preventDefault()
        this.props.updateRobot( 
            this.props.history,
            this.props.match.params.id,
            this.state.name,
            this.state.fuelType,
            this.state.fuelLevel,
            this.state.imageUrl
        )
    }

    render(){   
        const {name,fuelLevel,fuelType,imageUrl,projects,allProjects}=this.state
        
        return (
        <div>
            <div className="edit">
                <form onSubmit={this.createRobot}>
                    <label>Robot Name:</label> 
                    <input type="text" value={name} onChange={this.nameChange}/><br></br>
                    <label>Fuel Type:</label>
                    <select onChange={this.fuelTypeChange}>
                        <option value={fuelType}>{fuelType}</option>
                        <hr></hr>
                        <option value="electric">electric</option>
                        <option value="gas">gas</option>
                        <option value="diesel">diesel</option>
                    </select><br></br>
                    <label>Fuel Level:</label> 
                    <input type="text" value={fuelLevel} onChange={this.fuelLevelChange}/><br></br>
                    <label>Robor Image URL:</label>
                    <input type="url" value={imageUrl} onChange={this.imgChange}/><br></br>
                    <button className="addRobotBtn" type="submit">Save Changes</button>
                </form>
            </div>
            <h5 id="h">Projects assigned to {name}</h5>
            <div id="editNewProject">
                <select onChange={this.fuelTypeChange}>
                    {
                        projects.map(project=>{
                            return(
                            <option key={project.id} value={project.title}>{project.title}</option>
                            )
                        })
                    }                    
                </select>
                <button className="addRobotBtn">Add Project</button>
            </div>
              <div>
                {
                  projects.map(project=>{
                    return(
                      <div key={project.id} className="editProject">
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

export default connect(
    
    (state)=>{
        return {
           state
        }
    },
    (dispatch) => {
        return {
            getProjects: ()=>dispatch(fetchProjects()),
            getRobot: (id) => dispatch(getRobot(id)),
            updateRobot:(history,id,name,fuelType,fuelLevel,imageUrl)=>dispatch(
                updateRobot(history,id,name,fuelType,fuelLevel,imageUrl)
            )
        }
    }
)(EditRobot)