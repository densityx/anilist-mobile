// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
let singleQuery = `
query ($name: String) { # Define which variables will be used in the query (id)
  User (name: $name) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    name
    about
    avatar {
        large
    }
  }
}
`;

// Define the config we'll need for our Api request
let url = 'https://graphql.anilist.co';
let options = (name) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: singleQuery,
        variables: {
            name
        }
    })
});

export function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

export function handleError(error) {
    // alert('Error, check console');
    console.error('error', error);
}

export function retrieveData(name) {
    // Make the HTTP Api request
    return fetch(url, options(name))
        .then(handleResponse)
        .catch(handleError);
}