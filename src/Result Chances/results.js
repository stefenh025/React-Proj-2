import React from 'react';
import Probability from './probability.js';

export default class Results extends React.Component{
  render(){
    return(
      <div style={{color:"white"}}>
        <h1>Results</h1>
        {/* <Probability data={this.props.data} valueNumber={this.props.valueNumber}/> */}
        <Probability data={this.props.data}/>
      </div>
    )
  }
}