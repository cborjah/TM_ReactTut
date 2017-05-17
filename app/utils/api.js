import axios from 'axios';
import { client_id, client_secret } from '../tokens/credentials';

let params = "?client_id=" + client_id + "&client_secret=" + client_secret;

function getProfile(username) {
  return axios.get('https://api.github.com/users/' + username + params)
    .then((user) => user.data);
}

function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params)
    .then((repos) => repos);
}

function getStarCount(repos) {
  // console.log(repos);
  return repos.data.reduce((count, repo) => {
    // console.log('count: ', count);
    // console.log('repo.stargazers_count: ', repo.stargazers_count);
    return count + repo.stargazers_count;
  }, 0);
  // console.log('starcount: ', starcount);
}

function calculateScore(profile, repos) {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);
  // console.log('followers: ', followers);
  // console.log('total stars: ', totalStars);
  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    let profile = data[0];
    let repos = data[1];
    // console.log('repos: ', repos);
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

function sortPlayers(players) {
  // console.log('sortPlayers: ', players)
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  console.log(`players in battle: ${players}`);
  // players.map(getUserData) is shorthand for, players.map((player) => getUserData(player))
  return axios.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);
}

export function fetchPopularRepos(language) {
  let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

  return axios.get(encodedURI)
    .then((response) => response.data.items);
}
