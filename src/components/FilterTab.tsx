import * as React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { DatePicker, Select, Checkbox } from 'antd';
import * as actions from '../store/actions/actions';
import './FilterTab.css';
import langList from './../data/langList';
import { Moment } from 'moment';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { IRootState } from '../store/reducer';

const { Option } = Select;
const maxSortValue: number = 10000000;
const reguestsPerPage: number = 24;

interface IFilterTabProps {
  owner: string;
  language: string;
  type: string;
  stars: string;
  hasTopics: boolean;
  updatedAfter: Moment|'';
  sortOrder: string;
  page: number;
  searchResultAmount: number|null;
  isAddRepsLoading: boolean;
  changeFilter: (filterName: string, filterValue: string|boolean|Moment) => void;
  nextPage: () => void;
  initialize: () => void;
}

class FilterTab extends React.Component<IFilterTabProps> {

  private onOwnerChangeBouncer = debounce(value => this.props.changeFilter('owner', value), 1500);

  private onStarsChangeBouncer = debounce(value => this.props.changeFilter('stars', value), 1500);

  public componentDidMount() {
    this.props.initialize();
    window.addEventListener('scroll', this.scrolledDownHandler);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.scrolledDownHandler);
    this.onOwnerChangeBouncer.cancel();
    this.onStarsChangeBouncer.cancel();
  }

  public scrolledDownHandler = () : void => {
    const { isAddRepsLoading, searchResultAmount, page } = this.props;
    if (((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 400) &&
    !isAddRepsLoading && searchResultAmount && page <= searchResultAmount / reguestsPerPage) {
      this.props.nextPage();
    }
  }

  public onOwnerChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    this.onOwnerChangeBouncer(event.target.value);
  }

  public onLangChangeHandler = (value: string) : void => this.props.changeFilter('language', value);

  public onTypeChangeHandler = (value: string) : void => this.props.changeFilter('type', value);

  public onStarsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    event.persist();
    this.onStarsChangeBouncer(event.target.value);
  }

  public numValid = (event: React.KeyboardEvent<HTMLInputElement>) : void => {
    if (event.key === '.' || event.key === '-' || event.key === ',' || event.key === 'e') {
      event.preventDefault();
    }
  }

  public onDateChangeHandler = (value: Moment) : void =>
    this.props.changeFilter('updatedAfter', value || '')

  public onTopicChangeHandler = (event: CheckboxChangeEvent) : void =>
    this.props.changeFilter('hasTopics', event.target.checked)

  public onOrderChangeHandler = (value: string) : void =>
  this.props.changeFilter('sortOrder', value)

  public render() {
    return (
      <div className="filter-bar">
        <label>Sort by:
          <Select className="filter-antd-option"
            value={this.props.sortOrder}
            disabled={!!this.props.searchResultAmount &&
              this.props.searchResultAmount > maxSortValue}
            onChange={this.onOrderChangeHandler}>
              <Option value="Best match">Best match</Option>
              <Option value="Most stars">Most stars</Option>
              <Option value="Fevest stars">Fevest stars</Option>
              <Option value="Most forks">Most forks</Option>
              <Option value="Fevest forks">Fevest forks</Option>
              <Option value="Recently updated">Recently updated</Option>
              <Option value="Least updated">Least updated</Option>
          </Select>
        </label>
        <label>Search by owner:
          <input
            className="filter-option"
            type="text"
            spellCheck={false}
            placeholder="Owner login"
            onChange={this.onOwnerChangeHandler}
          />
        </label>
        <label>Language:
          <Select className="filter-antd-option"
            value={this.props.language}
            onChange={this.onLangChangeHandler}>
              {langList.map((lang) => {
                return <Option key={lang}>{lang}</Option>;
              })}
          </Select>
        </label>
        <label>Stars:
          <input
            className="filter-option filter-option-small"
            type="number"
            placeholder=">="
            onKeyPress={this.numValid}
            onChange={this.onStarsChangeHandler}
          />
        </label>
        <label>Type:
          <Select
            className="filter-antd-option filter-option-small"
            value={this.props.type}
            onChange={this.onTypeChangeHandler}>
              <Option value="All">All</Option>
              <Option value="Forks">Forks</Option>
              <Option value="Sources">Sources</Option>
          </Select>
        </label>
        <label>Updated after:
          <DatePicker
            className="filter-antd-option filter-option-medium"
            value={this.props.updatedAfter || undefined}
            onChange={this.onDateChangeHandler}
          />
        </label>
        <label>Has topics:
          <Checkbox
            className="filter-option-checkbox"
            checked={this.props.hasTopics}
            onChange={this.onTopicChangeHandler}
          />
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  owner: state.filters.owner,
  language: state.filters.language,
  type: state.filters.type,
  stars: state.filters.stars,
  updatedAfter: state.filters.updatedAfter,
  hasTopics: state.filters.hasTopics,
  sortOrder: state.filters.sortOrder,
  page: state.filters.page,
  searchResultAmount: state.data.totalCount,
  isAddRepsLoading: state.addRepsLoading
});

const mapDispatchToProps = {
  initialize: () => actions.initialize(),
  changeFilter: (filterName: string, filterValue: string|boolean|Moment) =>
    actions.changeFilter(filterName, filterValue),
  nextPage: () => actions.nextPage()
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterTab);
