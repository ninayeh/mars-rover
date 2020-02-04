import React from 'react';
import Rover from './RoverA';


class App extends React.Component {
  state = {
    initialPosition: '0 0 N',
    grid: [5, 5],
    execute: false,
    commands: ''
  }

  execute = () => {
    let initialPosition = this.startInput.value;
    if (/^[0-9]\s[0-9]\s[NEWS]$/.test(initialPosition)) {
        this.setState({
            execute: true,
            commands: this.commandsInput.value,
            initialPosition
        });
        
    } else {
        alert('Invalid start position.');
    }
  };

  clear = () => {
    this.setState({
      initialPosition: '',
      grid: [5, 5],
      execute: false,
      commands: ''
    });
  };

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
                      defaultValue={this.state.initialPosition}
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
                      pattern={'^[MRL]$'}
                      defaultValue={'MMR'}                
                      ref={(elm) => {
                          this.commandsInput = elm
                      }}
              />
   
          </div>
          <button className='btn btn-primary' onClick={this.execute}>Execute</button>
          {/* <button className='btn btn-primary' onClick={this.clear} >Clear</button> */}
        </div>
        <Rover 
          grid={this.state.grid} 
          initialPosition={this.state.initialPosition} 
          commands={this.state.commands}
          
        />
      </div>
     
    )
    
  }

}



export default App;
