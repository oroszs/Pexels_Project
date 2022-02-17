const getPhotos = async (query) => {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=50`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        }
    });
    return response.json();
}

export default getPhotos;