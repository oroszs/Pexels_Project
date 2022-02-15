const getPhotos = async () => {
    const query = 'Pug';
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
        headers: {
            Authorization: REACT_APP_API_KEY,
        }
    });
    const jsonObj = await response.json();
    await console.log(jsonObj.photos);
}

export default getPhotos;