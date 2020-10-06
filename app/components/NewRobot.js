import React, { Component } from "react"
import { connect } from "react-redux"
import {Link} from "react-router-dom"
import {createRobot} from "../redux/robots"


class NewRobot extends Component{
    constructor(){
        super();
        this.state={
            value:''
        }
        this.createRobot=  this.createRobot.bind(this)
        this.handleChange= this.handleChange.bind(this)
    }
    
    handleChange(ev){
        this.setState({value: ev.target.value})
    }

    createRobot(ev){
        ev.preventDefault()
        this.props.create( this.state.value,  this.props.history)
    }

    render(){
        const {value}= this.state
        return (
            <div className="newRobot">
                    <form onSubmit={this.createRobot}>
                        <label>Robot Name</label>
                        <input type="text" value={value} onChange={this.handleChange}/>
                        <button className="addRobotBtn" type="submit">Add Robot</button>
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
            create: (name,history)=> dispatch(createRobot(name,history))
        }
    }
)(NewRobot)