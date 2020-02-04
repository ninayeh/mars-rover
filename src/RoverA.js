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
      grid: props.grid,
      initialPosition: props.initialPosition,
      commands: props.commands
    }
  }


  componentDidUpdate(prevProps) {
    if (this.props.initialPosition !== prevProps.initialPosition || 
        this.props.commands !== prevProps.commands) {
        this.setState({ 
          grid: this.props.grid,
          initialPosition: this.props.initialPosition,
          commands: this.props.commands
      })
      this.process()
    }
  }


  process() {
    let { initialPosition, commands} = this.state
    let location = initialPosition.split(' ',2).map(Number);
    let facing = initialPosition.split(' ').slice(-1)[0];
    this.setState({
      location: location,
      facing: facing
    }, () => this.execute(commands))
  }
  

  execute = (commands) => {
    let commandsArray = commands.split('');
    let location = this.state.location;
    
    for(let index = 0; index < commandsArray.length; index++) {
      let command = commandsArray[index];
      if (command === 'M') {
        console.log('M')
        this.moveRover(location);
      } //else if (command === 'R') {
    //     console.log('R')
    //     this.turn(command);
    //   } else if (command === 'L') {
    //     console.log('L')
    //     this.turn(command);
    //   }
    }
    
  //   // this.formatResult();
  }

  moveRover(location) {
    let xIncrease = 0;
    let yIncrease = 0;
    let {grid, facing} = this.state;
    
    console.log(location)
    
    if (facing === 'N' && location[1] < grid[1]) {
      yIncrease = 1;
      
    } else if (this.facing === 'S' && this.location[1] > 0) { 
      yIncrease = -1;
    } else if (this.facing === 'E' && this.location[0] < this.grid[0] ) { 
      xIncrease = 1;
    } else if (this.facing === 'W' && this.location[0] > 0 ) { 
      xIncrease = -1;
    } 
  
    location = [location[0] + xIncrease, location[1] + yIncrease];
    return location

  //   this.setState({
  //     location: location
  //   }, ()=> {console.log(location)})
    
    
    
  };

  

  // turn(command) {
  //   const {facing} = this.state;
  //   if (command === 'R') {
  //     return this.facing =  RIGHT_TURNS_MAP[facing]
  //   } else {
  //     return this.facing =  LEFT_TURNS_MAP[facing]
  //   }
  // };

  // formatResult() {
  //   let space = ' '; 
  //   this.endLocation = this.location.join(' ') + space + this.facing;
  //   return this.endLocation
  // }

  render() {
    return(
      <div className="mt-5">
        <h2>Rover Component</h2>
        <p>{this.endLocation}</p>
      </div>
    )
  }
  
}


export default Rover;