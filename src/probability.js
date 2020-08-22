import React from 'react'

export default class Probability extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      chanceTen: "",
      chanceTwenty: "",
      chanceFifty: "",
      chanceHundred: "",
    }
    this.calculateProbabilities = this.calculateProbabilities.bind(this);
  }
  calculateProbabilities(){
    let totalDesiredProb = 0;
    let desiredEvents = this.props.data.filter(event => !(event.eventUndesired));
    desiredEvents.forEach(event =>{
      totalDesiredProb = totalDesiredProb + Number(event.eventProb);
    });
    console.log(totalDesiredProb);
    let probUndesired = (1-(totalDesiredProb/100));
    this.setState({
      chanceTen: ((1-(Math.pow(probUndesired,10)))*100).toFixed(2),
      chanceTwenty: ((1-(Math.pow(probUndesired,20)))*100).toFixed(2),
      chanceFifty: ((1-(Math.pow(probUndesired,50)))*100).toFixed(2),
      chanceHundred: ((1-(Math.pow(probUndesired,400)))*100).toFixed(2),
    });
    //(Math.pow(totalDesiredProb/100, 10)
    
    
  }
  render(){
    return(
      <div className="float-left">
        <h5>Hitting desired event in 10 trys: {this.state.chanceTen}</h5>
        <h5>Hitting desired event in 20 trys: {this.state.chanceTwenty}</h5>
        <h5>Hitting desired event in 50 trys: {this.state.chanceFifty}</h5>
        <h5>Hitting desired event in 100 trys: {this.state.chanceHundred}</h5>
        <button type="button" onClick={this.calculateProbabilities}>Click</button>
        <br></br>
        <label>Insert custom amount of tries: </label>
        <input type="number" className="col-2"></input>
      </div>
    )
  }
}