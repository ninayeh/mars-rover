import React from 'react';
import { render } from '@testing-library/react';
import Rover from '../MarseRover'

describe('Implement boundaries of map', () => {
  it('should assign map size', () => {
    let mr = new Rover([10,5])
    expect(mr.grid).toEqual([10,5]);
  });
  it('should use default map size 5x5 when not assigned', () => {
    let mr = new Rover()
    expect(mr.grid).toEqual([5,5]);
  });

  it('should stop increase Y when moving North beyond the boundary', () => {
    let mr = new Rover([5,5],'1 5 N')
    mr.commands('MM');
    expect(mr.facing).toEqual('N')
    expect(mr.location).toEqual([1, 5]);
  });

  it('should stop increase X when moving East beyond the boundary', () => {
    let mr = new Rover([5,5],'5 1 E')
    mr.commands('MM');
    expect(mr.facing).toEqual('E')
    expect(mr.location).toEqual([5, 1]);
  });

  it('should stop decrease Y when moving South beyond the boundary', () => {
    let mr = new Rover([5,5],'1 0 S')
    mr.commands('MM');
    expect(mr.facing).toEqual('S')
    expect(mr.location).toEqual([1, 0]);
  });

  it('should stop decrease X when moving West beyond the boundary', () => {
    let mr = new Rover([5,5],'0 3 W')
    mr.commands('MM');
    expect(mr.facing).toEqual('W')
    expect(mr.location).toEqual([0, 3]);
  });


});

describe('You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing', () => {
  it('should set starting location and facing direction', () => {
    let mr = new Rover([5,5],'1 2 E')
    expect(mr.location).toEqual(expect.arrayContaining([1,2]));  
    expect(mr.facing).toEqual('E')
  });
  it('should use default starting location value 0,0,N when not assigned', () => {
    let mr = new Rover()
    expect(mr.location).toEqual(expect.arrayContaining([0,0]));  
    expect(mr.facing).toEqual('N')
  }); 
});

describe('The rover receives a character string of commands',
 () => {
  it('should set commands string', () => {
    let mr = new Rover([5,5],'1 2 E')
    mr.commands('MMRMMLMMRM');
    expect(mr.commandsString).toEqual('MMRMMLMMRM');
  });
});

describe('Implement commands that move the rover forward one grid point and maintain the same heading',
 () => {
  it('should increase Y when moving north', () => {
    let mr = new Rover([5,5],'1 2 N')
    mr.commands('MM');
    expect(mr.facing).toEqual('N')
    expect(mr.location).toEqual([1, 4]);
  });

  it('should reduce Y when moving south', () => {
    let mr = new Rover([5,5],'1 2 S')
    mr.commands('MM');
    expect(mr.facing).toEqual('S')
    expect(mr.location).toEqual([1, 0]);
  });

  it('should increase X when moving East', () => {
    let mr = new Rover([5,5],'1 2 E')
    mr.commands('MM');
    expect(mr.facing).toEqual('E')
    expect(mr.location).toEqual([3, 2]);
  });

  it('should reduce X when moving West', () => {
    let mr = new Rover([5,5],'1 2 W')
    mr.commands('M');
    expect(mr.facing).toEqual('W')
    expect(mr.location).toEqual([0, 2]);
  });
});

describe('Implement commands that turn the rover left/right (L,R)', () => {
  it('should change direction from N to E when command is to turn right (R)', () => {
    let mr = new Rover([5,5],'1 2 N')
    mr.commands('R');
    expect(mr.facing).toEqual('E')
  });

  it('should change direction from S to W when command is to turn right (R)', () => {
    let mr = new Rover([5,5],'1 2 S')
    mr.commands('R');
    expect(mr.facing).toEqual('W')
  });

  it('should change direction from S to E when command is to turn right (L)', () => {
    let mr = new Rover([5,5],'1 2 S')
    mr.commands('L');
    expect(mr.facing).toEqual('E')
  });

  it('should change direction from N to W when command is to turn right (L)', () => {
    let mr = new Rover([5,5],'1 2 N')
    mr.commands('L');
    expect(mr.facing).toEqual('W')
  });
});

describe('format result', () => {
  it("should return endLocation '1 3 E'", () => {
    let mr = new Rover([5,5],'1 2 N')
    mr.commands('MR');
    expect(mr.endLocation).toEqual('1 3 E')
  });
  
});

describe('final test', () => {
  it('should return 1 3 N', () => {
    let mr = new Rover([5,5],'1 2 N')
    mr.commands('LMLMLMLMM');
    expect(mr.endLocation).toEqual('1 3 N')
  });
});