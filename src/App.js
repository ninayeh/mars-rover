import React from 'react';
import Rover from './RoverA';

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

class App extends React.Component {
  state = {
    start: '0 0 N',
    grid: [5, 5],
    commands: '',
    execute: false,
    end:''
  }

  execute = () => {
    let start = this.startInput.value;
    let commands = this.commandsInput.value;
    if (/^[0-9]\s[0-9]\s[NEWS]$/.test(start)) {
        this.setState({
            execute: true,
            commands,
            start
        }, () => {
          this.processLocation()
        } 
        );
        
    } else {
        alert('Invalid start position or commands.');
    }
  };

  processLocation = () => {
    let start = this.state.start
    let location = start.split(' ',2).map(Number);
    let facing = start.split(' ').slice(-1)[0];
    this.processCommands(location, facing)
  }

  processCommands = (location, facing) => {
    let commandsArray = this.state.commands.split('');
    let currentLocation = location
    let currentFacing = facing

    for(let index = 0; index < commandsArray.length; index++) {
      let command = commandsArray[index];
      
      if (command === 'M') {
        currentLocation = this.moveRover(currentLocation, currentFacing);
        
       } else if (command === 'R' || command === 'L') {
        currentFacing = this.turn(command, currentFacing);
        console.log(currentFacing)
      }  
    }
    this.formatResult(currentLocation, currentFacing);
    
  }

  moveRover = (clocation, facing) => {

    let xIncrease = 0;
    let yIncrease = 0;
    const grid = this.state.grid
    if (facing === 'N' && clocation[1] < grid[1]) {
      yIncrease = 1;
    } else if (facing === 'S' &&  clocation[1] > 0) { 
      yIncrease = -1;
    } else if (facing === 'E' && clocation[0] < grid[0] ) { 
      xIncrease = 1;
    } else if (facing === 'W' && clocation[0] > 0 ) { 
      xIncrease = -1;
    } 

    clocation =  [clocation[0] + xIncrease, clocation[1] + yIncrease]
    console.log(clocation)
    return clocation
  
  }

  turn(command, currentFacing) {
    if (command === 'R') {
      return currentFacing =  RIGHT_TURNS_MAP[currentFacing]
    } else {
      return currentFacing =  LEFT_TURNS_MAP[currentFacing]
    }
  };

  formatResult(currentLocation, currentFacing) {
    let space = ' '; 
    let end = currentLocation.join(' ') + space + currentFacing
    this.setState({
      end
    })

  }

  render() {
    return (
      <div className="container">
        <div className="mt-5">
        <h1>Input Component</h1>
          <div className="startPosition  my-3">
              <label htmlFor="startPosition">
                  Start Position (Eg: 0 0 N):
              </label>
              <input type="text"
                      id="startPosition"
                      maxLength={5}
                      required
                      className="form-control"
                      pattern= {/^[0-9]\s[0-9]\s[NEWS]$/}
                      defaultValue={this.state.start}
                      onBlur={this.validateStartPosition}
                      ref={(elm) => {
                          this.startInput = elm
                      }}
              />
          </div>
          <div className="commands my-3">
              <label htmlFor="commands">
                  Commands (M/R/L)
              </label>
              <input type="text"
                      id="commands"
                      maxLength={10}
                      required
                      className="form-control"
                      
                      defaultValue={'MMR'}                
                      ref={(elm) => {
                          this.commandsInput = elm
                      }}
              />
   
          </div>
          <button className='btn btn-primary' onClick={this.execute}>Execute</button>
        </div>
        <Rover 
          endLocation={this.state.end} 
        />
      </div>
     
    )
    
  }

}



export default App;
