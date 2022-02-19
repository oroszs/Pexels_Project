import React from 'react';
import './style.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    search(){
        const callApi = this.props.callApi;
        const searchTextElement = document.querySelector('#searchTextInput');
        callApi(searchTextElement.value);
        searchTextElement.value = '';
        this.props.resetPageNumber();
    }

    render() {
        return (
            <div className='componentDiv searchDiv'>
                <input type='text' placeholder='Search by keyword' id='searchTextInput'></input>
                <button id='searchButton' onClick={() => this.search()}>Get Images</button>
            </div>
        );
    }
}

export default Search;