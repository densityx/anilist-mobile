// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
let singleQuery = `
query (
    $id: Int
    $name: String
    $animePage: Int
    $mangaPage: Int
) {
    User(id: $id, name: $name) {
        favourites {
          anime(page: $animePage) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            edges {
              favouriteOrder
              node {
                id
                type
                status(version: 2)
                format
                isAdult
                bannerImage
                episodes
                duration
                genres
                trending
                favourites
                isFavourite
                title {
                  userPreferred
                }
                coverImage {
                  large
                }
                startDate {
                  year
                }
              }
            }
          }
          manga(page: $mangaPage) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            edges {
              favouriteOrder
              node {
                id
                type
                status(version: 2)
                format
                isAdult
                bannerImage
                genres
                trending
                favourites
                isFavourite
                title {
                  userPreferred
                }
                coverImage {
                  large
                }
                startDate {
                  year
                }
              }
            }
          }
        }
    }
}
`;

// Define the config we'll need for our Api request
let url = 'https://graphql.anilist.co';
let options = (accessToken) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...[!!accessToken ? {'Authorization': 'Bearer ' + accessToken} : null]
    },
    body: JSON.stringify({
        query: singleQuery,
        variables: {
            id: 6096580,
            name: 'dnstyx',
            animePage: 1,
            mangaPage: 1,
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

export function retrieveData(accessToken) {
    // Make the HTTP Api request
    return fetch(url, options(accessToken))
        .then(handleResponse)
        .catch(handleError);
}