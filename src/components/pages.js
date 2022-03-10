import React from 'react';

class Pages extends React.Component {

    paginate() {
        const numOfPages = this.props.numOfImages / 10;
        const pageNums = [];
        const currentPage = this.props.currentPage;
        for(let page = 1; page < numOfPages + 1; page++) {
            pageNums.push(
                <div className={page !== currentPage ? 'activePageNumber pageNumber' : 'inactivePageNumber pageNumber'} key={page} onClick={() => this.props.pageClick(page)}>{page}</div>
            );
        }
        return pageNums;
    }

    render() {
        const numOfImages = this.props.numOfImages;
        return (
            <div>
                {numOfImages > 0 ? <div id='paginateDiv' className='componentDiv'>{this.paginate()}</div> : null}
            </div>
        );
    }

}
export default Pages;