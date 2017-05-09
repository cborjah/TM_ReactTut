import React, { Component } from 'react';

// If component only has a render method, is stateless, takes in props, and just renders UI,
// use a stateless functional component
const SelectLanguage = (props) => {
  let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map((lang) => {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
            onClick={() => props.onSelect(lang)}
            key={lang}>
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

class Popular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All'
    }
  }

  updateLanguage(lang) {
    this.setState({ selectedLanguage: lang });
  }

  render() {
    return (
      <SelectLanguage
        selectedLanguage={this.state.selectedLanguage}
        onSelect={(lang) => this.updateLanguage(lang)}
      />
    );
  }
}

export default Popular;
