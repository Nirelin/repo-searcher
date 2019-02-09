const filtersToUrl = (filters) => {
  const repoName = filters.repoName;
  
  const owner = filters.owner ? 'user:'+ filters.owner : ''
  
  const language = (filters.language === 'All') ? '' : 'language:' + encodeURIComponent(
      (filters.language.indexOf(' ') === -1) ? filters.language : '"'+ filters.language + '"'
    );
  
  let type: string = '';
  switch (filters.type){
    case 'All': type = 'fork:true';
    break;
    case 'Forks': type = 'fork:only';
    break;
    case 'Sources': type = '';
  }
  
  const stars = filters.stars ? 'stars:>=' + filters.stars : '';
  
  const updatedAfter = filters.updatedAfter ?  'pushed:>=' + filters.updatedAfter.format('YYYY-MM-DD') : '';
  
  const hasTopics = filters.hasTopics ? 'topics:>0' : '';
  
  let order: string = '';
  switch (filters.sortOrder){
    case 'Best match': order = '';
    break;
    case 'Most stars': order = 'sort:stars';
    break;
    case 'Fevest stars': order = 'sort:stars-asc';
    break
    case 'Most forks': order = 'sort:forks';
    break;
    case 'Fevest forks': order = 'sort:forks-asc';
    break
    case 'Recently updated': order = 'sort:updated';
    break;
    case 'Least updated': order = 'sort:updated-asc';
  }
  
  const page = (filters.page !== 1) ? '&page='+ filters.page : '';
  
  const queryArr = [repoName, owner, language, type, stars, updatedAfter, hasTopics, order]
  let addToUrl = '';
  queryArr.map((val)=> {
    if(val===''){return}
    addToUrl += (addToUrl==='' ? val : `+${val}`);
  })

  return 'https://api.github.com/search/repositories?q=' + addToUrl +'+is:public&per_page=24' + page;
}
export default filtersToUrl;
