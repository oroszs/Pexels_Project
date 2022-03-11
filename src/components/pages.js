import React from 'react';

class Pages extends React.Component {

    paginate() {
        const numOfPages = this.props.numOfPages;
        const currentPage = this.props.currentPage;
        return [...Array(numOfPages)].map((value, pageIndex) => {
            const page = pageIndex + 1;
            return  <div className={page !== currentPage ? 'activePageNumber pageNumber' : 'inactivePageNumber pageNumber'} key={page} onClick={() => this.props.pageClick(page)}>{page}</div>
        })
    }

    render() {
        const numOfPages = this.props.numOfPages;
        return (
            <div>
                {numOfPages > 0 ? <div id='paginateDiv' className='componentDiv'>{this.paginate()}</div> : null}
            </div>
        );
    }

}
export default Pages;