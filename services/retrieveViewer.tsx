let singleQuery = `
query {
    Viewer {
        id
        name
        about
        favourites(page: 1) {
            anime{
                nodes{
                    id
                }
            }
        }
    }
}`;

let url = 'https://graphql.anilist.co';
let options = (id, type, accessToken) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
    },
    body: JSON.stringify({
        query: singleQuery,
        //     variables: {
        //         id,
        //         type
        //     }
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

export function retrieveViewer(accessToken = '') {
    console.log('accessToken', accessToken);
    // Make the HTTP Api request
    return fetch(url, options(accessToken))
        .then(handleResponse)
        .catch(handleError);
}