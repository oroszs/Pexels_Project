import React from 'react';

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orientation: 'Portrait',
        }
    }

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

    componentDidMount() {
        window.screen.orientation.onchange = (() => this.adjustModal());
    }

    componentDidUpdate() {
        let imageObj = this.props.imageObj;
        let modalWrapper = document.querySelector('#modalWrapper');
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
                modalWrapper.appendChild(img);
                modalWrapper.style.display = 'block';
                this.adjustModal();
                modalWrapper.className = 'fadeIn';
            });
        }
    }

    getOrientation() {
        return window.screen.availHeight > window.screen.availWidth ? 'Portrait' : 'Landscape';
    }

    adjustModal(){
        const orientation = this.getOrientation();
        let modal = document.querySelector('.modal');
        if(modal) {
            if(orientation === 'Landscape') {
                modal.style.width = 'auto';
                modal.style.height = '85vh';
            } else {
                modal.style.width = '85vw';
                modal.style.height = 'auto';
            }
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