import React from 'react';
import ReactDOM from 'react-dom';
import getPhotos from './service.js';

class App extends React.Component {
    render() {
        return (
            <Images />
        );
    }
}

class Images extends React.Component {
    constructor(props) {
        super(props);
        const photoObj = {};
        this.state = {
            photoObj: photoObj,
        }
    }

    componentDidMount() {
        this.callApi();
    }
    callApi() {
        let photos;
        getPhotos('Dog').then(data => {
            photos = data.photos;
            console.log(photos);
        });
        this.setState({
            photoObj: photos,
        });
    }
    

    render() {
        const pics = this.state.photoObj;
        console.log(pics)
        return(
            <div>
                
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));