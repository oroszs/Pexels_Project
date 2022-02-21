import React from 'react';

class Modal extends React.Component{

    hideModal(){
        let bg = document.querySelector('#modalBG');
        bg.style.display = 'none';
        this.props.getImageInfo(undefined);
    }

    modal(imageObj){
        let modalSrc = imageObj.src.original;
        return (
            <div id='modalBG' onClick={() => this.hideModal()}>
                <div id='modalWrapper'>
                    <img id='modal' src={modalSrc} />
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        let imageObj = this.props.imageObj;
        if(imageObj){
            let alteredWidth;
            let alteredHeight;
            if(imageObj.width > imageObj.height && window.screen.width > 450) {
                if(imageObj.height > window.screen.height) {
                    alteredWidth = 'auto';
                    alteredHeight = '85vh';
                } else {
                    alteredWidth = '85vw';
                    alteredHeight = 'auto';
                }
            }
            if(alteredWidth || alteredHeight) {
                let modal = document.querySelector('#modal');
                modal.style.width = alteredWidth;
                modal.style.height = alteredHeight;
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