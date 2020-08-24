import React from 'react'

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
    }
    this.calculateProbabilities = this.calculateProbabilities.bind(this);
    this.handleCustomInput = this.handleCustomInput.bind(this);
    //this.calculateCustom = this.calculateCustom.bind(this);
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
  }
  // calculateCustom(){
  //   let totalDesiredProb = 0;
  //   let desiredEvents = this.props.data.filter(event => !(event.eventUndesired));
  //   desiredEvents.forEach(event =>{
  //     totalDesiredProb = totalDesiredProb + Number(event.eventProb);
  //   });
  //   let probUndesired = (1-(totalDesiredProb/100));
  //   this.setState({
  //     chanceCustomProb: ((1-(Math.pow(probUndesired,this.state.chanceCustom)))*100).toFixed(2),
  //   })
  // }
  handleCustomInput(e){
    this.setState({
      chanceCustom: e.target.value,
    });
    
  }
  render(){
    return(
      <div className="text-left">
        <h5>Hitting desired event in 10 tries: {this.state.chanceTen}</h5>
        <h5>Hitting desired event in 20 tries: {this.state.chanceTwenty}</h5>
        <h5>Hitting desired event in 50 tries: {this.state.chanceFifty}</h5>
        <h5>Hitting desired event in 100 tries: {this.state.chanceHundred}</h5>
        <div>
        <h5>Hitting desired event in
        <input type="number" className="col-2 mx-1" onChange={e => this.handleCustomInput(e)}></input>
        tries: {this.state.chanceCustomProb} </h5>
        <div >
        <button type="button" className="btn btn-block btn-primary col-8" onClick={this.calculateProbabilities}>Calculate</button>
        </div>
        </div>
        
      </div>
    )
  }
}