import React from 'react';
import UserInput from '../User Input/userinput.js';
import Results from '../Result Chances/results.js';
import Chart from 'react-google-charts';
let data = require('../Events DB/eventProbabilities.js');

export default class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      numOfEvents : 1,
      //valueNumber: false,
      hello : true,
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.updateProb = this.updateProb.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateDesired = this.updateDesired.bind(this);
  }
  //Should take in all of User input's and push into eventProbabilities.js if new
  // handleSubmit(e){

  // }

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
      eventValue: "Event " + (this.state.numOfEvents + 1),
      eventUndesired: true,
    }
    data.events.push(emptyEvent);
  }

  //On a text field's onChange, update the appropriate object's prob
  //OnBlur does not work as well since user might skip leaving field to directly clicking a box
  updateProb(e, index){
    let removePercent = e.target.value.replace("%","");
    if (isNaN(e.target.value) === false){
      data.events[index] = {
        position: index,
        eventProb: removePercent,
        eventValue: data.events[index].eventValue,
        eventUndesired: data.events[index].eventUndesired,
      }
      this.forceUpdate();
    }
    else{
      alert("Please enter a number!");
    }
    //Force rerender of screen on user change --bandaid, should avoid forceUpdate calls in react
    
  }

  //On a text field's onChange, update the corresponding array's value
  updateValue(e, index){
    data.events[index] = {
      position: index,
      eventProb: data.events[index].eventProb,
      eventValue: e.target.value,
      eventUndesired: data.events[index].eventUndesired,
    }
    //Force rerender of screen on user change --bandaid, should avoid forceUpdate calls in react
    this.forceUpdate();
  }  
  //On a text field's onChange, update the corresponding array's Desired boolean
  updateDesired(undesired, index){
    data.events[index] = {
      position: index,
      eventProb: data.events[index].eventProb,
      eventValue: data.events[index].eventValue,
      eventUndesired: undesired,
    }
  }

  render(){
    //Compiles the data to be placed into the piechart imported from Google
    let dataArray = [["Event Value", "Probability"]];
    let totalUndesiredProb = 0;
    let totalDesiredProb = 0;
    data.events.forEach(
      event =>(
        dataArray.push([event.eventValue, parseFloat(event.eventProb)])  
      )
    );

    //Calculates the total Probability of both Desired and Undesired events
    //Filters Event by Undesired bool, makes sure probability field isn't empty then adds it to total undesired
    data.events.filter(
      event => (event.eventUndesired)).filter(
        event => (event.eventProb !== "")).forEach(
          event => (totalUndesiredProb = totalUndesiredProb + parseFloat(event.eventProb))
          );
    //Filters Event by desired bool, makes sure probability field isn't empty then adds it to total undesired
    data.events.filter(
      event => (!(event.eventUndesired))).filter(
        event => (event.eventProb !== "")).forEach(
          event => (totalDesiredProb = totalDesiredProb + parseFloat(event.eventProb))
          );
    //Fills the remaining probability with a dummy value
    if (totalDesiredProb + totalUndesiredProb !== 100){
      if (totalDesiredProb + totalUndesiredProb > 100){
        alert("Probabilities are higher than 100%, please keep event chances under 100%");
      }
      else{
        let remainProb = (100 - totalUndesiredProb - totalDesiredProb);   
        dataArray.push(["Remaining Undesired", remainProb]);
      }
    }
    return(
      <div className="container">
        <div className="row">
          <div className="col-lg mx-3">
          <UserInput 
            numOfEvents={this.state.numOfEvents} 
            updateProb={this.updateProb} 
            updateValue={this.updateValue} 
            updateDesired={this.updateDesired} 
            handleAddClick={this.handleAddClick}
          />
          </div>
          <div className="col-lg mx-3">
            {/* <Results data={data.events} valueNumber={this.state.valueNumber}/> */}
            <Results data={data.events}/>
          </div>
        </div>
        <Chart
          width="100%"
          height="50vh"
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={dataArray}
          options={{
            title: 'Your Outcome',
            titleTextStyle: {color: 'white'},
            legendTextStyle: {color: 'white'},
            backgroundColor: 'transparent',
          }}
          />
      </div>
    )
  }
}