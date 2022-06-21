import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise , moveCounterClockwise } from './../state/action-creators';

export function Wheel(props) {
  console.log(props);
  const { wheel } = props;
  
  
  return (
    <div id="wrapper">
      <div id="wheel">
        {
          [0, 1, 2, 3, 4, 5].map(index => (
            <div className = { wheel === index ? "cog active" : "cog" } style={{ "--i": index}}>{ wheel === index ? "B" : "" }</div>
          ))
        }
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => props.moveCounterClockwise()} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => props.moveClockwise()}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st => st, { moveClockwise, moveCounterClockwise })(Wheel)