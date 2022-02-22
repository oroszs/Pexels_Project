import React from 'react';
import './style.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.searchWithEnterKey = this.searchWithEnterKey.bind(this);
    }

    search(){
        const callApi = this.props.callApi;
        const searchTextElement = document.querySelector('#searchTextInput');
        callApi(searchTextElement.value);
        searchTextElement.value = '';
        this.props.resetPageNumber();
    }

    searchWithEnterKey(keyCode) {
        if(keyCode.which === 13) {
            this.search();
        }
    }
    componentDidMount(){
        document.addEventListener('keydown', this.searchWithEnterKey);
    }

    render() {
        return (
            <div className='componentDiv searchDiv'>
                <input type='text' placeholder='Enter Keyword' id='searchTextInput'></input>
                <button id='searchButton' onClick={() => this.search()}>Search</button>
            </div>
        );
    }
}

export default Search;