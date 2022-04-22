import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Form, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'

const ProductScreen = ({ history, match }) => { //match is used to get values from the url
    const [qty, setQty] = useState(1)
    
    const dispatch = useDispatch()

    useEffect(()=>{ //runs as soon as the component loads
        dispatch(listProductDetails(match.params.id)) //to get the id from the url
    }, [dispatch, match]) 

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`) //history.push is used to redirect
    }

    const productDetails = useSelector((state)=>state.productDetails)
    const {loading, error, product} = productDetails

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/> {/**Fluid prevents the image from going out of the container */}
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock>0?'In Stock':'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button 
                                    onClick = {addToCartHandler}
                                    className='btn-block' 
                                    type='button' 
                                    disabled={product.countInStock===0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
            
        </> 
    )
}

export default ProductScreen
