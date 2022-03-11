import React from 'react';
import '../stylesheets/style.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.searchWithEnterKey = this.searchWithEnterKey.bind(this);
    }

    search(){
        const callApi = this.props.callApi;
        const searchTextElement = document.querySelector('#searchTextInput');
        const regEx = /[^A-Za-z]/;
        let invalidSearchTextBool = regEx.test(searchTextElement.value);
        if(invalidSearchTextBool) {
            const invalidDiv = document.createElement('div');
            invalidDiv.textContent = 'Invalid Search';
            invalidDiv.id = 'invalidSearchDiv';
            invalidDiv.className = 'slowFadeOut';
            const wrapper = document.querySelector('#searchWrapper');
            wrapper.prepend(invalidDiv);
            setTimeout( () => {
                invalidDiv.remove();
            }, 2100);
            searchTextElement.value = '';
        } else {
            callApi(searchTextElement.value);
            searchTextElement.value = '';
            this.props.resetPageNumber();
        }
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
            <div id='searchWrapper'>
                <div className='componentDiv searchDiv'>
                    <input type='text' placeholder='Enter Keyword' id='searchTextInput'></input>
                    <button id='searchButton' onClick={() => this.search()}>Search</button>
                </div>
            </div>
        );
    }
}

export default Search;