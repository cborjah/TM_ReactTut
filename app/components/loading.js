import React, { Component } from 'react';

class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      speed: props.speed
    }
  }

  componentDidMount() {
    let stopper = this.props.text + '...';
    this.interval = window.setInterval(() => {
      if(this.state.text === stopper) {
        this.setState({ text: this.props.text });
      } else {
        this.setState({ text: this.state.text + '.' });
      }
    }, this.props.speed);
    console.log('interval created: ', this.interval)
  }

  componentWillUnmount() {
    console.log('Cleared interval');
    window.clearInterval(this.interval);
    console.log('this.interval: ', this.interval)
  }

  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    );
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

let styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

export default Loading;
