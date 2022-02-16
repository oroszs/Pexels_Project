import React from 'react';
import ReactDOM from 'react-dom';
import Images from './images.js';

class App extends React.Component {
    render() {
        return (
            <Images />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));