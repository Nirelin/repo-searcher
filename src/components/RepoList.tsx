import * as React from 'react';
import { connect } from 'react-redux';
import {IRootState, IItem} from '../store/reducer';
import Card from './Card';
import { Spin, BackTop } from 'antd';
import './RepoList.css';

interface IRepoListProps {
  repos: {
    totalCount: number|null,
    items: IItem[]|null
  }
  refreshLoading: boolean
  addRepoLoading: boolean
  selectedLanguage: string
  error: any
}

const RepoList = ( props: IRepoListProps) => {
  const { repos, refreshLoading, addRepoLoading, selectedLanguage, error } = props
  
  let list: any = null;
  if (repos.items && repos.totalCount! > 0 && !refreshLoading) {
    list = <div className='item-list'>
      {repos.items.map((repo, index) =>
        <Card 
          key={index} 
          data={repo} 
          selectedLanguage={selectedLanguage}
        />)}
    </div>
  } else if (repos.totalCount===0 && !refreshLoading) {
      list = <div className='full-app-message'>
        <p className='message'>Nothing Found</p>
      </div>
  } else if (error && !refreshLoading) {
      list = <div className='full-app-message'>
        <div className='message'>
          <p>Error {error.status}</p>
          <p>{error.data.hasOwnProperty('errors') ? 
            error.data.errors[0].message: error.data.message}</p>
        </div>
      </div>
  }

  let spinner: any = null
  if (refreshLoading) {
    spinner = <div className="full-app-message"><Spin className='message' size="large" /></div>
  } else if (addRepoLoading) {
    spinner = <div className="low-app-message"><Spin size="large" /></div>
  } 

  return (
    <div className='repo-list'>
      {list}
      {spinner}
      <BackTop style={{right:'50px'}} />
    </div>
  )
}

const mapStateToProps = (state: IRootState) => ({
  repos: state.data,
  refreshLoading: state.refreshLoading,
  addRepoLoading: state.addRepsLoading,
  selectedLanguage: state.filters.language,
  error: state.error
})

export default connect(mapStateToProps)(RepoList);