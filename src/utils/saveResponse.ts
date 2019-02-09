import starsRound from './starsRound';

const saveResponse = (response) => {
  return {
    totalCount: response.data.total_count,
    items: response.data.items.map((item)=>{
      return {
        name: item.name,
        owner: item.owner.login,
        ownerAvatar: item.owner.avatar_url,
        description: item.description,
        htmlUrl: item.html_url,
        language: item.language,
        stars: starsRound(item.stargazers_count),
        forks: `${item.forks}`
      }
    })
  }
}
export default saveResponse;

