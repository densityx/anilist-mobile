const retrieveUserQuery = (accessToken = '') => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (accessToken) {
        headers['Authorization'] = 'Bearer ' + accessToken;
    }
    
    console.log('accessToken', accessToken);
    // Make the HTTP Api request
    return fetch(
        'https://graphql.anilist.co',
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query: `
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
                            manga{
                                nodes{
                                    id
                                }
                            }
                        }
                    }
                }`,
            })
        }
    )
        .then(response => response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        }))
        .catch(error => console.error(error));
}

export {retrieveUserQuery};