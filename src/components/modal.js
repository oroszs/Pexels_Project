import React from 'react';
import Loading from './loading.js';

class Modal extends React.Component{

    hideModal(){
        let bg = document.querySelector('#modalBG');
        bg.style.display = 'none';
        this.props.getImageInfo();
        this.props.setScrollPosition();
    }

    modal(){
        return (
            <div id='modalBG' onClick={() => this.hideModal()}>
                <Loading />
            </div>
        );
    }

    componentDidUpdate() {
        let imageObj = this.props.imageObj;
        let modalBG = document.querySelector('#modalBG');
        let loadingDiv = document.querySelector('#loadingDiv');
        let loadTime, startTime, endTime, date;
        if(imageObj){
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
            let modalSrc = imageObj.src.original;
            waitForImageLoad(modalSrc).then((img) => {
                img.className = 'modal';
                date = new Date();
                endTime = date.getTime();
                loadingDiv.className += ' fadeOut';
                loadTime = (endTime - startTime) / 1000;
                console.log(`Loaded in ${loadTime} Seconds`);
                modalBG.appendChild(img);
                setTimeout(() => {                
                    img.style.display = 'block';
                    img.className += ' fadeIn';
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