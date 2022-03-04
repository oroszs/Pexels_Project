import React from 'react';
import Loading from './loading.js';

class Modal extends React.Component{

    hideModal(){
        let bg = document.querySelector('#modalBG');
        bg.style.display = 'none';
        this.props.getImageInfo();
        this.props.setScrollPosition();
    }

    modal(imageObj){
        let imageLink = imageObj.url;
        let imageArtistLink = imageObj.photographer_url;
        let imageArtist = imageObj.photographer;
        return (
            <div id='modalBG' onClick={() => this.hideModal()}>
                <Loading />
                <div id='modalDiv'>
                    <span id='modalLinkSpan'>This&nbsp;
                        <a className='modalLink' href={imageLink} onClick={(e)=>{e.stopPropagation()}}>Photo</a> 
                        &nbsp;was taken by&nbsp; 
                        <a className='modalLink' href={imageArtistLink} onClick={(e)=>{e.stopPropagation()}}>{imageArtist}</a> 
                        &nbsp;on&nbsp;
                        <a className='modalLink' href='https://www.pexels.com' onClick={(e)=>{e.stopPropagation()}}>Pexels</a>
                    </span>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        let imageObj = this.props.imageObj;
        if(imageObj){
            let modalSrc = imageObj.src.original;
            let modalDiv = document.querySelector('#modalDiv');
            let loadingDiv = document.querySelector('#loadingDiv');
            let loadTime, startTime, endTime, date;
            const waitForImageLoad = (src) => {
                date = new Date();
                startTime = date.getTime();
                return new Promise ((resolve, reject) => {
                    let image = new Image();
                    image.onload = () => resolve(image);
                    image.onerror = () => reject;
                    image.src = src;
                });
            }
            waitForImageLoad(modalSrc).then((img) => {
                img.className = 'modal';
                modalDiv.prepend(img);
                date = new Date();
                endTime = date.getTime();
                loadingDiv.className += ' fadeOut';
                loadTime = (endTime - startTime) / 1000;
                console.log(`Loaded in ${loadTime} Seconds`);
                setTimeout(() => {                
                    modalDiv.style.display = 'flex';
                    modalDiv.className += ' fadeIn';
                }, 300);
            });
        }
    }

    render(){
        let imageObj = this.props.imageObj;
        return (
            <div>
                {imageObj? this.modal(imageObj) : null}
            </div>
        );
    }
}

export default Modal;