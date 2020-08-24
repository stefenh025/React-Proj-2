import React from 'react';
import UserInput from './userinput.js';
import Results from './results.js';
let data = require('./eventProbabilities.js');

export default class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      numOfEvents : 2,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateProb = this.updateProb.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateDesired = this.updateDesired.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }
  //Should take in all of User input's and push into eventProbabilities.js if new
  handleSubmit(e){

  }
  //Creates an Empty Object to be pushed into our array of objects
  //Update state to let child component know to display the additional field that corresponds to object made
  handleAddClick(){
    this.setState({
      numOfEvents: this.state.numOfEvents + 1,
    })
    //+ 1 to compensate asynchronous setState
    let emptyEvent = {
      position: this.state.numOfEvents + 1,
      eventProb: "",
      eventValue: "",
    }
    data.events.push(emptyEvent);
    console.log(data.events);
  }
  //On a text field's onBlur, update the appropriate object's prob
  updateProb(e, index){
    console.log(index);
    data.events[index] = {
      position: index,
      eventProb: e.target.value,
      eventValue: data.events[index].eventValue,
      eventUndesired: true,
    }
    console.log(data.events[index]);
  }
  updateValue(e, index){
    console.log(index);
    data.events[index] = {
      position: index,
      eventProb: data.events[index].eventProb,
      eventValue: e.target.value,
    }
    console.log(data.events[index]);
  }  
  updateDesired(undesired, index){
    console.log(index);
    data.events[index] = {
      position: index,
      eventProb: data.events[index].eventProb,
      eventValue: data.events[index].eventValue,
      eventUndesired: undesired,
    }
    console.log(data.events[index]);
  }
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col mx-3">
          <UserInput 
            numOfEvents={this.state.numOfEvents} 
            updateProb={this.updateProb} 
            updateValue={this.updateValue} 
            updateDesired={this.updateDesired} 
            handleAddClick={this.handleAddClick}
          />
          </div>
          <div className="col mx-3">
          <Results data={data.events}/>
          </div>
        </div>
      </div>
    )
  }
}