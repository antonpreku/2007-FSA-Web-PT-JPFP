import React, { Component } from "react"
import { connect } from "react-redux"
import {createProject} from "../redux/projects"


class NewProject extends Component{
    constructor(){
        super();
        this.state={
            value:''
        }
        this.createProject=  this.createProject.bind(this)
        this.handleChange= this.handleChange.bind(this)
    }
    
    handleChange(ev){
        this.setState({value: ev.target.value})
    }

    createProject(ev){
        ev.preventDefault()
        this.props.create( this.state.value,  this.props.history)
    }

    render(){
        const {value}= this.state
        return (
            <div className="newRobot">
                    <form onSubmit={this.createProject}>
                        <label>Project Name</label>
                        <input type="text" value={value} onChange={this.handleChange}/>
                        <button className="addRobotBtn" type="submit">Add Project</button>
                    </form>
            </div>
        )
    }
}

export default connect(
    ()=>{
        return {
        }
    },
    (dispatch) => {
        return {
            create: (title,history)=> dispatch(createProject(title,history))
        }
    }
)(NewProject)