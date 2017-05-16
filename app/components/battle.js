import React, { Component } from 'react';

class PlayerInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
  }

  handleChange(event) {
    let value = event.target.value;
    console.log('value: ' + value);
    this.setState({ username: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username)
  }

  render() {
    return (
      <form className='column' onSubmit={(event) => this.handleSubmit(event)}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={(event) => this.handleChange(event)}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    );
  }
}

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    // Used ES6 fat arrow function instead to bind "this"
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, username) {
    if(id === 'playerOne') {
      this.setState({
        playerOneName: username,
        playerOneImage: `https://github.com/${username}.png?size=200`
      });
    }
    if(id === 'playerTwo') {
      this.setState({
        playerTwoName: username,
        playerTwoImage: `https://github.com/${username}.png?size=200`
      });
    }
  }

  render() {
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;

    return (
      <div>
        <div className='row'>
          {/*  if condition before && is true, then return whatever is after &&  */}
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              // Pass onSubmit as an anonymous function in order to bind this to handleSubmit
              onSubmit={(id, username) => this.handleSubmit(id, username)}
            />}
          {/*  if condition before && is true, then return whatever is after &&  */}
          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              // Pass onSubmit as an anonymous function in order to bind this to handleSubmit
              onSubmit={(id, username) => this.handleSubmit(id, username)}
            />}
        </div>
      </div>
    );
  }
}

export default Battle;
