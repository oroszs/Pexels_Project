import React from 'react';
import './style.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    search(){
        const callApi = this.props.callApi;
        const searchTextElement = document.querySelector('#searchTextInput');
        const imageDiv = document.querySelector('.thumbnailDivHolder');
        imageDiv.scrollTo(0,0);
        callApi(searchTextElement.value);
        searchTextElement.value = '';
        
    }

    render() {
        return (
            <div className='componentDiv searchDiv'>
                <input type='text' placeholder='Search For New Images' id='searchTextInput'></input>
                <button id='searchButton' onClick={() => this.search()}>Get Images</button>
            </div>
        );
    }
}

export default Search;