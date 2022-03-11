import React from 'react';
import Loading from './loading.js';
import '../stylesheets/style.css';

class Images extends React.Component {

    arrangePhotos(){
        let currentPage = this.props.currentPage;
        let startingIndex  = (currentPage - 1) * 10;
        let imgTagArray = [];
        let imageObj = this.props.images;
        const getImageInfo = this.props.getImageInfo;
        if(imageObj.length > 9){
            let imageArray = imageObj.map(image => image.src.large);
            let lowIndex = startingIndex;
            let highIndex = startingIndex + 10;
            for(let imageIndex = lowIndex; imageIndex < highIndex; imageIndex++){
                if(imageArray[imageIndex]) {
                    imgTagArray.push(
                        <div key={imageIndex} className='thumbnailDivWrapper'>
                            <div className='thumbnailDiv' onClick={() => getImageInfo(imageObj[imageIndex])}>
                                <img className='thumbnail' src={imageArray[imageIndex]} alt='Failed to load...'></img>
                            </div>
                        </div>
                    );
                }
            }
            return (
                <div className='fadeIn thumbnailDivHolder componentDiv'>{imgTagArray}</div>
            );
        } else {
            return (
                <div className='fadeIn thumbnailDivHolder componentDiv' style={{display:'block'}}>No Results Found...</div>
            );
        }
    }

    render() {
        let imgs = this.props.images;
        return(
            <div>
                {imgs ? this.arrangePhotos() : <Loading />}
            </div>
        );
    }
}

export default Images;