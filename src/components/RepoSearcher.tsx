import * as React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import * as actions from '../store/actions/actions';
import './RepoSearcher.css';
import { IRootState } from './../store/reducer';

const { Search } = Input;

interface IRepoSearcherProps {
  searchResult: number|null;
  changeFilter: (filterName: string, filterValue: string|boolean) => void;
}

class RepoSearcher extends React.Component<IRepoSearcherProps> {

  public onSearchSubmitHandler = (value: string) : void => {
    this.props.changeFilter('repoName', value);
  }

  public render() {
    let searchRes: any;
    if (this.props.searchResult && this.props.searchResult < 10000000) {
      searchRes = <div>
        <h2 className="search-result">Repositories found: {this.props.searchResult}</h2>
      </div>;
    } else { searchRes = null; }
    return (
      <div className="repo-search">
        <Search size="large"
          placeholder="Enter repository name"
          onSearch={this.onSearchSubmitHandler}
          enterButton={true}
        />
        {searchRes}
      </div>
    );
  }
}
const mapStateToProps = (state: IRootState) => ({
  searchResult: state.data.totalCount
});
const mapDispatchToProps = {
  changeFilter: (filterName: string, filterValue: string|boolean) =>
    actions.changeFilter(filterName, filterValue)
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoSearcher);
