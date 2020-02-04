import React from 'react';

const RIGHT_TURNS_MAP = {
  N: "E",
  E: "S",
  S: "W",
  W: "N"
};

const LEFT_TURNS_MAP = {
  N: "W",
  W: "S",
  S: "E",
  E: "N"
};

class Rover extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      endLocation: ''
    }
  }


  componentDidUpdate(prevProps) {
    if (this.props.endLocation !== prevProps.endLocation) {
        this.setState({ 
          endLocation: this.props.endLocation,
      })
    }
  }


  render() {
    return(
      <div className="mt-5">
        <h2>Rover Component</h2>
        <p>{this.state.endLocation}</p>
      </div>
    )
  }
  
}


export default Rover;