import React from 'react';
import ReactDOM from 'react-dom';
import Images from './images.js';
import Search from './search.js';
import getPhotos from './service.js';

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
                <Images images={images? images: undefined}/>
                <Search callApi={this.callApi}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));