import React from 'react';
//let data = "./eventProbabilites.js";

export default class Probability extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      chanceTen: "",
      chanceTwenty: "",
      chanceFifty: "",
      chanceHundred: "",
      chanceCustom: "",
      chanceCustomProb: "",
      valueIsNum: "",
    }
    this.calculateProbabilities = this.calculateProbabilities.bind(this);
    this.calculateEV = this.calculateEV.bind(this);
    this.checkValueNum = this.checkValueNum.bind(this);
    this.handleCustomInput = this.handleCustomInput.bind(this);
  }
  calculateProbabilities(){
    let totalDesiredProb = 0;
    let desiredEvents = this.props.data.filter(event => !(event.eventUndesired));
    desiredEvents.forEach(event =>{
      totalDesiredProb = totalDesiredProb + Number(event.eventProb);
    });
    let probUndesired = (1-(totalDesiredProb/100));
    this.setState({
      chanceTen: ((1-(Math.pow(probUndesired,10)))*100).toFixed(2) + "%",
      chanceTwenty: ((1-(Math.pow(probUndesired,20)))*100).toFixed(2) + "%",
      chanceFifty: ((1-(Math.pow(probUndesired,50)))*100).toFixed(2) + "%",
      chanceHundred: ((1-(Math.pow(probUndesired,400)))*100).toFixed(2) + "%",
      chanceCustomProb: ((1-(Math.pow(probUndesired,this.state.chanceCustom)))*100).toFixed(2) + "%",
    });
    
    this.checkValueNum();
  }
  calculateEV(){
    let EV = 0;
    this.props.data.forEach(event =>{
      EV = EV + (event.eventProb/100) * (parseFloat(event.eventValue));
      console.log(event.eventUndesired);
      console.log(event);
    })
    return EV;
  }
  checkValueNum(){
    let valueIsNumCheck = true;
    this.props.data.forEach(event =>{
      //Use RegEx to check if Value input is a number, if so, then we can calculate an Expected Value
      if (/^\d*\.?\d+$/.test(event.eventValue)){
        valueIsNumCheck = valueIsNumCheck && true;
      }
      else {
        valueIsNumCheck = valueIsNumCheck && false;
      }
    })
    this.setState({
      valueIsNum: valueIsNumCheck,
    })
  }
  handleCustomInput(e){
    this.setState({
      chanceCustom: e.target.value,
    });
    
  }
  render(){
    let expectedValue;
    if (this.state.valueIsNum){
      let calculatedEV = this.calculateEV();
      expectedValue = <h5>The expected value of one try is: {calculatedEV}</h5>
    }
    else{
      expectedValue = <h5>Input numerical values if you want to calculated an expected value of one try.</h5>
    }
    return(
      <div className="text-left">
        <h5>Hitting desired event in 10 tries: {this.state.chanceTen}</h5>
        <h5>Hitting desired event in 20 tries: {this.state.chanceTwenty}</h5>
        <h5>Hitting desired event in 50 tries: {this.state.chanceFifty}</h5>
        <h5>Hitting desired event in 100 tries: {this.state.chanceHundred}</h5>
        <h5>Hitting desired event in
        <input type="number" className="col-2 mx-1" onChange={e => this.handleCustomInput(e)}></input>
        tries: {this.state.chanceCustomProb} </h5>
        <button type="button" className="btn btn-block btn-primary col-8" onClick={this.calculateProbabilities}>Calculate</button>
        <br></br>
        <br></br>
        {expectedValue}
      </div>
    )
  }
}