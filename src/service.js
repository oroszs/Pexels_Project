const getPhotos = async (query) => {
    let endpoint = (query === undefined) ? 
    `https://api.pexels.com/v1/curated?per_page=50`:
    `https://api.pexels.com/v1/search?query=${query}&per_page=50`;
    const response = await fetch(endpoint, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        }
    });
    return response.json();
}

export default getPhotos;