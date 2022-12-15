const query = `
mutation ($about: String) {
    UpdateUser (about: $about) {
        about
    }
}
`;

const url = 'https://graphql.anilist.co';
const options = (id, name, about, accessToken) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
    },
    body: JSON.stringify({
        query: query,
        variables: {
            id,
            name,
            about,
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

export function updateProfile(id, name, about, accessToken) {
    // Make the HTTP Api request
    return fetch(url, options(id, name, about, accessToken))
        .then(handleResponse)
        .catch(handleError);
}