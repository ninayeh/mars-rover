// import React from 'react';

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

class Rover {
  constructor(grid, initialPosition) {
    this.grid = (grid === undefined) ? [5, 5] : grid;
    if (initialPosition === undefined) {
      this.location = [0,0]
      this.facing = 'N'
    } else {
      this.location = initialPosition.split(' ',2).map(Number);
      this.facing = initialPosition.split(' ').slice(-1)[0]
    }
        
  }

  commands(value) {
    this.commandsString = value
    if (value === undefined) { 
      return this.commandsString;
    } else {
      this.execute(value)    
    } 
  }

  execute = (value) => {
    let commandsArray = value.split('');
    
    for(let index = 0; index < commandsArray.length; index++) {
      var command = commandsArray[index];
      if (command === 'M') {
        this.moveRover()
        // if (!this.moveRover(command)) break;
      } else if (command === 'R' || command === 'L') {
        this.turn(command);
      }
    }
    this.formatResult();
  }

  moveRover() {
    let xIncrease = 0;
    let yIncrease = 0;
    if (this.facing === 'N' && this.location[1] < this.grid[1]) {
      yIncrease = 1;
    } else if (this.facing === 'S' && this.location[1] > 0) { 
      yIncrease = -1;
    } else if (this.facing === 'E' && this.location[0] < this.grid[0] ) { 
      xIncrease = 1;
    } else if (this.facing === 'W' && this.location[0] > 0 ) { 
      xIncrease = -1;
    } 
  
    let newLocation = [this.location[0] + xIncrease, this.location[1] + yIncrease];
    // console.log(this.location[1] + yIncrease)
    return this.location = newLocation
  };

  

  turn(command) {
    let currentFacing = this.facing
    if (command === 'R') {
      return this.facing =  RIGHT_TURNS_MAP[currentFacing]
    } else {
      return this.facing =  LEFT_TURNS_MAP[currentFacing]
    }
  };

  formatResult() {
    let space = ' '; 
    this.endLocation = this.location.join(' ') + space + this.facing;
    return this.endLocation
  }
  
}


export default Rover;