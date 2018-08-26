import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { getProducts } from 'actions/products'
import { getServices } from 'actions/services'
import CardProduct from 'components/cards/product'
import CardService from 'components/cards/service'
import Pagination from 'components/pagination'

class ListMain extends Component {
    
    isEmptyData = data => ! data.length

    getData = type => {
        switch (type) {
            case 'product':
                store.dispatch(getProducts('pagination', {new_pagination: true, page_size: 6}))
                break
            case 'service':
                store.dispatch(getServices('pagination', {new_pagination: true, page_size: 6}))
                break
            default: return
        }
    }

    componentWillMount() {
        this.getData(this.props.type)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.guest !== this.props.user.guest) {
            this.getData(this.props.type)
        }
    }

    changePage = page => {
        store.dispatch(getProducts('pagination', {new_pagination: true, page_size: 6, page: page}))
    }

    printList = (item, i) => {
        if (i < 6) {
            let component
            switch (this.props.type) {
                case 'product':
                    component = <CardProduct {...item} />
                    break
                case 'service':
                    component = this.props.itemType === 'small' ? <CardService {...item} /> : <CardService {...item} />
                    break
                default: return
            }

            return <div key={i} className="col-md-6 col-lg-4 mb-3">{component}</div>
        }   
    }

    render() {
        const { items, total_pages, page } = this.props[this.props.type].pagination
        return (
            <div className="row">
               { items.map((item, i) => this.printList(item, i)) }
               { 
                    this.props.pagination
                    ?   <div className="d-flex justify-content-center w-100">
                            <Pagination
                                responsive={[{width: 1199, count: 10}, {width: 991, count: 7}, {width: 600, count: 6}, {width: 500, count: 5}, {width: 420, count: 4}, {width: 375, count: 3}]}
                                onChange={this.changePage} 
                                total={total_pages} 
                                active={page} />
                        </div>
                    :   null
               }
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        user: {
            guest: state.user.guest,
            location: state.user.location
        },
        product: {
            pagination: state.products.pagination,
        },
        service: {
            pagination: state.services.pagination,
        }
    })

export default connect(
    mapStateToProps
)(ListMain)