import React, { Component } from 'react';
import Popular from './popular';
import ReactRouter, { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './nav';
import Home from './home';
import Battle from './battle';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/popular' component={Popular} />
            {/* With Switch, this last route will always fire if none of the previous routes are hit. */}
            <Route render={() => <p>Page Not Found</p>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
