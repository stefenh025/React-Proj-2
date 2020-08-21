import React from 'react';
import Input from './input';

export default class UserInput extends React.Component{
  render(){
    let eventHolder = [];
    for (let i = 0; i < this.props.numOfEvents; i++){
      eventHolder.push(<Input 
        key={i} 
        position={i} 
        updateProb={this.props.updateProb} 
        updateValue={this.props.updateValue} 
        updateDesired={this.props.updateDesired}/>);
    }
    return(
      <div style={{color:"white"}}>
        <h1>User input</h1>
        <button type="button" className="btn btn-success float-right my-1" onClick={this.props.handleAddClick}>Add Event</button>
        {eventHolder}
      </div>
    )
  }
}