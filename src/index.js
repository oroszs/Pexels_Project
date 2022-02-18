import React from 'react';
import ReactDOM from 'react-dom';
import Images from './images.js';
import Search from './search.js';
import getPhotos from './service.js';
import Helmet from 'react-helmet';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            images: undefined,
        }
        this.callApi = this.callApi.bind(this);
    }

    componentDidMount(){
        this.callApi();
    }

    callApi(query) {
        getPhotos(query).then(data => {
            let photos = data.photos;
            this.setState({
                images: photos,
            });
        });
    }

    render() {
        let images = this.state.images;
        return (
            <div id='wrapper'>
                <Helmet>
                    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
                    <title>Pexels Image Viewer</title>
                    <meta name='description' content='Image Viewing App utilizing the Pexels API'/>
                    <meta name='title' property='og:title' content = 'Pexels Image App'/>
                    <meta property='og:type' content='Website'/>
                    <meta name='image' property='og:image' content='https://github.com/oroszs/Pexels_Project/blob/26eb5a1b41a46407f3458f39068712464edffe4f/public/pexels-image-viewer-screenshot.jpg'/>
                    <meta name='description' property='og:description' content='Image Viewing App utilizing the Pexels API'/>
                    <meta name='author' content='Sean Orosz' />
                </Helmet>
                <Images images={images? images: undefined}/>
                <Search callApi={this.callApi}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));