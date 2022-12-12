import {handleError, handleResponse} from "./singleQuery";

const query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search, type: ANIME) {
      id
      title {
        romaji
      }
      description
      coverImage {
        large
      }
    }
  }
}
`;

const url = 'https://graphql.anilist.co';
const options = (term) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: {
            search: term,
            page: 1,
            perPage: 6,
            type: 'ANIME',
        }
    })
});

export function retrieveData(term: string) {
    return fetch(url, options(term))
        .then(handleResponse)
        .catch(handleError);
}