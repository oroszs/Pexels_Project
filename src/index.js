import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal.js';
import Images from './images.js';
import Pages from './pages.js';
import Search from './search.js';
import getPhotos from './service.js';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            images: undefined,
            currentPage: 1,
        }
        this.callApi = this.callApi.bind(this);
        this.pageClick = this.pageClick.bind(this);
        this.resetPageNumber = this.resetPageNumber.bind(this);
    }

    componentDidMount(){
        this.callApi();
    }

    callApi(query) {
        getPhotos(query).then(data => {
            if(data) {
                let photos = data.photos;
                this.setState({
                    images: photos,
                });
            }
        });
    }

    pageClick(page){
        this.setState({
            currentPage: page,
        });
    }

    resetPageNumber() {
        this.setState({
            currentPage: 1,
        });
    }

    render() {
        let images = this.state.images;
        let currentPage = this.state.currentPage;
        return (
            <div id='wrapper'>
                <Modal />
                <Images images={images? images : undefined} currentPage={currentPage} />
                <Pages numOfImages={images? images.length : 0} pageClick={this.pageClick} currentPage={currentPage}/>
                <Search callApi={this.callApi} resetPageNumber={this.resetPageNumber}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));