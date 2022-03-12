import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './components/modal.js';
import Images from './components/images.js';
import Pages from './components/pages.js';
import Search from './components/search.js';
import Pexels from './components/pexels.js';
import getPhotos from './utils/service.js';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            images: undefined,
            imageObj: undefined,
            scrollPosition: undefined,
            currentPage: 1,
        }
        this.callApi = this.callApi.bind(this);
        this.pageClick = this.pageClick.bind(this);
        this.resetPageNumber = this.resetPageNumber.bind(this);
        this.getImageInfo = this.getImageInfo.bind(this);
        this.setScrollPosition = this.setScrollPosition.bind(this);
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
        this.setState({
            images: undefined,        
        }, ()=> {
            setTimeout(() => {
                getPhotos(query).then(data => {
                    if(data) {
                        let photos = data.photos;
                        this.setState({
                            images: photos,
                        }, this.resetScrollPosition());
                    }
                });
            }, 0);
        });
    }

    pageClick(page){
        this.setState({
            currentPage: page,
        }, this.resetScrollPosition());
    }

    getImageInfo(imageObj){
        this.getScrollPosition();
        this.setState({
            imageObj: imageObj,
        });
    }

    getScrollPosition() {
        let thumbnailHolder = document.querySelector('.thumbnailDivHolder');
        let scrollCoords = [];
        scrollCoords.push(thumbnailHolder.scrollLeft);
        scrollCoords.push(thumbnailHolder.scrollTop);
        this.setState({
            scrollPosition: scrollCoords,
        });
    }

    setScrollPosition() {
        let thumbnailHolder = document.querySelector('.thumbnailDivHolder');
        let scrollCoords = this.state.scrollPosition;
        thumbnailHolder.scrollLeft = scrollCoords[0];
        thumbnailHolder.scrollTop = scrollCoords[1];
    }

    resetPageNumber() {
        this.setState({
            currentPage: 1,
        });
    }

    render() {
        let images = this.state.images;
        let pages = 0;
        if(images) {
            pages = parseInt(images.length / 10);
        }
        let currentPage = this.state.currentPage;
        let imageObj = this.state.imageObj;
        return (
            <div id='wrapper'>
                <Modal imageObj={imageObj? imageObj : undefined} getImageInfo={this.getImageInfo} setScrollPosition={this.setScrollPosition}/>
                <Images images={images? images : null} currentPage={currentPage} getImageInfo={this.getImageInfo}/>
                <Pages numOfPages={images? pages : 0} pageClick={this.pageClick} currentPage={currentPage}/>
                <Search callApi={this.callApi} resetPageNumber={this.resetPageNumber}/>
                <Pexels />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));