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
        this.state = {
            imgs: {},
        }
    }

    callApi() {
        getPhotos('Pug').then(data => {
            let photos = data.photos;
            this.setState({
                imgs: photos,
            });
        });
    }
    
    componentDidMount(){
        this.callApi();
    }

    render() {
        let imgs = this.state.imgs;
        console.log(imgs);
        return(
            <div>
                {imgs[0] != undefined ? <img src={imgs[0].src.medium} alt='Blah'></img> : null}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));