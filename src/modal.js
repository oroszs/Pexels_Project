import React from 'react';

class Modal extends React.Component{

    hideModal(){
        let bg = document.querySelector('#modalBG');
        bg.style.display = 'none';
        this.props.getImageInfo();
    }

    modal(){
        return (
            <div id='modalBG' onClick={() => this.hideModal()}>
            </div>
        );
    }

    componentDidUpdate() {
        let imageObj = this.props.imageObj;
        let modalBG = document.querySelector('#modalBG');
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
                loadTime = (endTime - startTime) / 1000;
                console.log(`Loaded in ${loadTime} Seconds`);
                modalBG.appendChild(img);
                img.style.display = 'block';
                img.className += ' fadeIn';
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