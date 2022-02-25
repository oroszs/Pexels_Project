import React from 'react';
import loadingImage from './load-icon.png';

class Loading extends React.Component {

    render(){
        return(
            <div id='loadingDiv'>
                <span id='loadText'>Loading...</span>
                <img id='loadingIcon' className='spin' src={loadingImage} alt='loading'></img>
            </div>
        );
    }
}
export default Loading;