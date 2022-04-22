import React, { useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions.js'

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    useEffect(()=>{ //runs as soon as the component loads
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber]) 
    
    //use same name as the store
    const productList = useSelector((state) => state.productList)
    const {loading, error, products, pages, page} = productList
 

    return (
        <>
            {!keyword && <ProductCarousel />}
            <h1>Latest products</h1>
            { loading ? (<Loader/>) : error ? (<Message variant='danger' >{error}</Message>) : (
                <>
                <Row>
                {products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}    
                </Row> 
                
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
              
        </>
    )
}

export default HomeScreen
