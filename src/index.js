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
                    <title>Pexels Image Viewer</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
                </Helmet>
                <Images images={images? images: undefined}/>
                <Search callApi={this.callApi}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));