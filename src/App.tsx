import * as React from 'react';
import './App.css';
import RepoList from './components/RepoList';
import FilterTab from './components/FilterTab';
import RepoSearcher from './components/RepoSearcher';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <RepoSearcher />
        <div className="content">
          <FilterTab />
          <RepoList />
        </div>
      </div>
    );
  }
}

export default App;
