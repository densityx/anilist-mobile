import AsyncStorage from "@react-native-async-storage/async-storage";

const fetcher = async (body) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    try {
        const accessToken = await AsyncStorage.getItem('@access_token');

        if (accessToken) {
            headers['Authorization'] = 'Bearer ' + accessToken;
        }
    } catch (e) {
        console.error(e)
    }

    return fetch(
        'https://graphql.anilist.co',
        {
            method: 'POST',
            headers,
            body: body
        }
    )
        .then(response => response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        }))
        .catch(error => console.error(error));
}

export const fetchUserData = () => {
    const query = JSON.stringify({
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
                                    title {
                                        userPreferred
                                    }
                                    coverImage {
                                        large
                                    }
                                    genres
                                    duration
                                    episodes
                                    trending
                                    favourites
                                }
                            }
                            manga{
                                nodes{
                                    id
                                    title {
                                        userPreferred
                                    }
                                    coverImage {
                                        large
                                    }
                                    genres
                                    trending
                                    favourites
                                }
                            }
                        }
                    }
                }`,
    });

    return fetcher(query);
}