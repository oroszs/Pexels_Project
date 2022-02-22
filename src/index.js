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
            imageObj: undefined,
            currentPage: 1,
        }
        this.callApi = this.callApi.bind(this);
        this.pageClick = this.pageClick.bind(this);
        this.resetPageNumber = this.resetPageNumber.bind(this);
        this.getImageInfo = this.getImageInfo.bind(this);
    }

    componentDidMount(){
        this.callApi();
    }

    resetScrollPosition(){
        const imageDiv = document.querySelector('.thumbnailDivHolder');
        if(imageDiv){
            imageDiv.scrollTo(0,0);
        }
    }

    callApi(query) {
        getPhotos(query).then(data => {
            if(data) {
                let photos = data.photos;
                this.setState({
                    images: photos,
                }, this.resetScrollPosition());
            }
        });
    }

    pageClick(page){
        this.resetScrollPosition();
        this.setState({
            currentPage: page,
        });
    }

    getImageInfo(imageObj){
        this.setState({
            imageObj: imageObj,
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
        let imageObj = this.state.imageObj;
        return (
            <div id='wrapper'>
                <Modal imageObj={imageObj? imageObj : undefined} getImageInfo={this.getImageInfo}/>
                <Images images={images? images : undefined} currentPage={currentPage} getImageInfo={this.getImageInfo}/>
                <Pages numOfImages={images? images.length : 0} pageClick={this.pageClick} currentPage={currentPage}/>
                <Search callApi={this.callApi} resetPageNumber={this.resetPageNumber}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));