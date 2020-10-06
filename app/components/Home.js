import React from 'react';
import { connect } from 'react-redux';


export class Home extends React.Component {
  
  render(){
    return (
      <div>
        <h1>HELLO, Welcome</h1>
      </div>

    )
     
  }
}

const mapState = (state) => {      
  return {
  }
}
const dp = (dispatch) => {
  return {
  }
}

export default connect(mapState, dp)(Home);
