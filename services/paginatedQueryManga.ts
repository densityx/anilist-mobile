import {handleError, handleResponse} from "./singleQuery";

// popular: Page(page: $page, perPage: $perPage) {
//     media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
//       ...media
//     }
// }

const query = `
query {
  trending: Page(page: 1, perPage: 6) {
    media(sort: TRENDING_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
  popular: Page(page: 1, perPage: 6) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(sort: POPULARITY_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
  manhwa: Page(page: 1, perPage: 6) {
    media(
      sort: POPULARITY_DESC
      type: MANGA
      countryOfOrigin: "KR"
      isAdult: false
    ) {
      ...media
    }
  }
  top: Page(page: 1, perPage: 10) {
    media(sort: SCORE_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
}
fragment media on Media {
  id
  title {
    userPreferred
  }
  coverImage {
    extraLarge
    large
    color
  }
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  bannerImage
  season
  description
  type
  format
  status(version: 2)
  episodes
  duration
  chapters
  volumes
  genres
  isAdult
  averageScore
  popularity
  mediaListEntry {
    id
    status
  }
}

`;

const url = 'https://graphql.anilist.co';
const options = (term, page, type) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: {
            search: term,
            page: page,
            perPage: 12,
            type,
            season: 'FALL',
            seasonYear: 2022
        }
    })
});

export function retrieveData(term: string, page: number, type: string) {
    return fetch(url, options(term, page, type))
        .then(handleResponse)
        .catch(handleError);
}