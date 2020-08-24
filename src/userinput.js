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
        <div className="text-left">
        <h3>How to Use:</h3>
        <section >
          1. % = Chance of event in % form<br></br>
          2. Toggle desired if you want the event to happen/Calculate for it. All events are undesired by default.<br></br>
          3. (Optional) Value = Value of event ie. 5$ or it'll rain, etc<br></br>
          4. Autofills leftover % with undesired
        </section>
        </div>
        <button type="button" className="btn btn-success float-right my-1" onClick={this.props.handleAddClick}>Add Event</button>
        {eventHolder}
      </div>
    )
  }
}