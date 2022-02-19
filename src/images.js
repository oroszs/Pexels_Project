import React from 'react';
import './style.css';

class Images extends React.Component {
    constructor(props) {
        super(props);
    }

    arrangePhotos(){
        let currentPage = this.props.currentPage;
        let startingIndex  = (currentPage - 1) * 10;
        let imgTagArray = [];
        let imageObj = this.props.images;
        if(imageObj.length > 9){
            let imageArray = imageObj.map(image => image.src.medium);
            let lowIndex = startingIndex;
            let highIndex = startingIndex + 10;
            for(let imageIndex = lowIndex; imageIndex < highIndex; imageIndex++){
                if(imageArray[imageIndex]) {
                    imgTagArray.push(
                        <div key={imageIndex} className='thumbnailDiv'>
                            <img className='thumbnail' src={imageArray[imageIndex]} alt='Failed to load image...'></img>
                        </div>
                    );
                }
            }
            return (
                <div className='thumbnailDivHolder componentDiv'>{imgTagArray}</div>
            );
        } else {
            return (
                <div className='thumbnailDivHolder componentDiv'><h2>No Results Found...</h2></div>
            );
        }

    }

    componentDidUpdate() {
        const imageDiv = document.querySelector('.thumbnailDivHolder');
        if(imageDiv){
            imageDiv.scrollTo(0,0);
        }
    }

    render() {
        let imgs = this.props.images;
        return(
            <div>
                {imgs ? this.arrangePhotos() : null}
            </div>
        );
    }
}

export default Images;