// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
let singleQuery = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      large
    }
    description
    episodes
    duration
    genres
    trending
    favourites
    trailer {
      id
      site
      thumbnail
    }
    startDate {
      day
      month
      year
    }
    endDate {
      day
      month
      year
    }
    relations {
      nodes{
        id
        title {
          romaji
        }
        coverImage{
          large
        }
      }
    }
  }
}
`;

// Define the config we'll need for our Api request
let url = 'https://graphql.anilist.co';
let options = (id) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: singleQuery,
        variables: {
            id
        }
    })
});

export function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

export function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

export function retrieveData(animeId) {
    // Make the HTTP Api request
    return fetch(url, options(animeId))
        .then(handleResponse)
        .catch(handleError);
}