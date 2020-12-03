import React from 'react';
import '../App.css';
export default class Input extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      undesired: true,
    }
    this.handleOptions = this.handleOptions.bind(this);
  }
  handleOptions(){
    this.setState({
      undesired: !(this.state.undesired),
    });
    this.props.updateDesired(!(this.state.undesired), this.props.position);
  }
  render(){    
    return(
      <div className="my-3 container px-0">
        <div className="input-group row mx-0">
          
          <div className="input-group-prepend col-sm-12 col-md-2 px-0">
            <span className="input-group-text w-100">Event {this.props.position + 1}</span>
          </div>
          <div className="col-sm-6 col-md-3 px-0">
          <input name="eventProb" type="text" className="form-control" placeholder="%" onChange={e => this.props.updateProb(e, this.props.position)}></input>
          </div>
          <div className="col-sm-6 col-md-3 px-0">
          <input name="eventValue" type="text" className="form-control" placeholder="Value" onChange={e => this.props.updateValue(e, this.props.position)}></input>
          </div>
          

          <div className="btn-group btn-group-toggle col-sm-12 col-md-4 px-0" data-toggle="buttons">
            <label className={"btn btn-secondary px-0 mx-0 " + (this.state.undesired ? "active" : "")}>
                <input 
                type="radio" 
                name="options" 
                id="Undesired" 
                autoComplete="off" 
                checked={this.state.undesired}
                onChange={this.handleOptions}></input>Undesired
            </label>
            <label style={{paddingLeft: "8px", paddingRight: "8px"}} className={"btn btn-secondary mx-0 " + (!this.state.undesired ? "active" : "")}>
              <input 
              type="radio" 
              name="options" 
              id="Desired" 
              autoComplete="off" 
              onChange={this.handleOptions}></input>Desired
            </label>
          </div>
        </div>
      </div>
    )
  }
}