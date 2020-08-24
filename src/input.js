import React from 'react';
import './App.css';
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
      <div className="my-3">
        <div className="input-group">

          <div className="input-group-prepend">
            <span className="input-group-text" id="">Event {this.props.position + 1}</span>
          </div>
          <input name="eventProb" type="number" min="0" max="100" step="any" className="form-control" placeholder="%" onBlur={e => this.props.updateProb(e, this.props.position)}></input>
          <input name="eventValue" type="text" className="form-control" placeholder="Value" onBlur={e => this.props.updateValue(e, this.props.position)}></input>

          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className={"btn btn-secondary " + (this.state.undesired ? "active" : "")}>
                <input 
                type="radio" 
                name="options" 
                id="Undesired" 
                autoComplete="off" 
                checked={this.state.undesired}
                onChange={this.handleOptions}></input>Undesired
            </label>
            <label className={"btn btn-secondary " + (!this.state.undesired ? "active" : "")}>
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