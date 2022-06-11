import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}
const coords = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor(){
    super();
    this.state = {
      ...initialState
    }
  }

  getXY = (idx) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return coords[idx];
  }

  getXYMessage = (idx) => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const message = `Coordinates (${this.getXY(idx)[1]}, ${this.getXY(idx)[0]})`
    return message;
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({...initialState});
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left' && coords[this.state.index][1] > 1) return [(this.state.index - 1), true];
    if(direction === 'up' && coords[this.state.index][0] > 1) return [(this.state.index - 3), true];
    if(direction === 'down' && coords[this.state.index][0] < 3) return [(this.state.index + 3), true];
    if(direction === 'right' && coords[this.state.index][1] < 3) return [(this.state.index + 1), true];
    return [this.state.index, false];
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const [newIndex, isPossible] = this.getNextIndex(evt.target.id)
    const newMessage = `You can't go ${evt.target.id}`
    if(isPossible){
      this.setState({
        ...this.state,
        index: newIndex,
        steps: (this.state.steps + 1),
        message: ''
      })
    } else if(!isPossible) {
      this.setState({
        ...this.state,
        message: newMessage
      })
    }
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const newObj = {
      x: coords[this.state.index][1],
      y: coords[this.state.index][0],
      steps: this.state.steps,
      email: this.state.email
    }
    axios.post('http://localhost:9000/api/result', newObj)
      .then(res => this.setState({...this.state, message: res.data.message}))
      .catch(err => this.setState({...this.state, message: err.response.data.message}))
    this.setState({
      ...this.state,
      email: ''
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage(this.state.index)}</h3>
          <h3 id="steps">You moved {this.state.steps} time{this.state.steps === 1 ? '' : 's'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={this.onChange} />
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
