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
                <div id='modalWrapper'>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        let imageObj = this.props.imageObj;
        let modalWrapper = document.querySelector('#modalWrapper');
        let loadTime = 0;
        let startTime;
        let endTime;
        let date;
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
                let alteredWidth, alteredHeight;
                let landscapeScreen = window.screen.width > window.screen.height;
                if(landscapeScreen) {
                    alteredWidth = 'auto';
                    alteredHeight = '85vh';
                } else {
                    alteredWidth = '85vw';
                    alteredHeight = 'auto';
                }
                img.style.width = alteredWidth;
                img.style.height = alteredHeight;
                date = new Date();
                endTime = date.getTime();
                loadTime = (endTime - startTime) / 1000;
                console.log(`Loaded in ${loadTime} Seconds`);
                modalWrapper.appendChild(img);
                modalWrapper.style.display = 'block';
                modalWrapper.className = 'fadeIn';
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