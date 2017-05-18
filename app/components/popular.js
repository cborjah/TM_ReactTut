import React, { Component } from 'react';
import { fetchPopularRepos } from '../utils/api';
import Loading from './loading';

// If component only has a render method, is stateless, takes in props, and just renders UI,
// use a stateless functional component
function SelectLanguage (props) {
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

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  );
}

class Popular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({ selectedLanguage: lang, repos: null });

    fetchPopularRepos(this.state.selectedLanguage)
      .then((repos) => this.setState({ repos }));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={(lang) => this.updateLanguage(lang)}
        />
        {!this.state.repos ? <Loading /> : <RepoGrid repos={this.state.repos}/>}
      </div>
    );
  }
}

export default Popular;
