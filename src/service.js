const getPhotos = async (query) => {
    let endpoint = (query === undefined) ? 
    `https://api.pexels.com/v1/curated?per_page=50`:
    `https://api.pexels.com/v1/search?query=${query}&per_page=50`;
    try{
        let response = await fetch(endpoint, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            }
        });
        if(response.status == 200) {
            let jsonObj = await response.json();
            return jsonObj;
        }
    } catch(err) {
        alert(err);
    }
}

export default getPhotos;