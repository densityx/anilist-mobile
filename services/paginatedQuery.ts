import {handleError, handleResponse} from "./singleQuery";

// popular: Page(page: $page, perPage: $perPage) {
//     media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
//       ...media
//     }
// }

const query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String, $season: MediaSeason, $seasonYear: Int) {
    season: Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(
          season: $season
          seasonYear: $seasonYear
          sort: POPULARITY_DESC
          type: ANIME
          isAdult: false
        ) {
          ...media
        }
      }
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
  seasonYear
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
  nextAiringEpisode {
    airingAt
    timeUntilAiring
    episode
  }
  studios(isMain: true) {
    edges {
      isMain
      node {
        id
        name
      }
    }
  }
}
`;

const url = 'https://graphql.anilist.co';
const options = (term, page) => ({
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
            type: 'ANIME',
            season: 'FALL',
            seasonYear: 2022
        }
    })
});

export function retrieveData(term: string, page: number) {
    return fetch(url, options(term, page))
        .then(handleResponse)
        .catch(handleError);
}