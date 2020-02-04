import React from 'react';

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
        <h2>Rover Final Location</h2>
        <p>{this.state.endLocation}</p>
      </div>
    )
  }
}


export default Rover;