import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import Homeimage1 from '../images/Homeimage1.jpg'
import Homeimage2 from '../images/Homeimage2.jpg'
import Homeimage3 from '../images/Homeimage3.jpg'

const Home = () => {
  return (
    <div>
        <Row style={{'--bs-gutter-x': '0rem'}}>
            <Col md={5} className="d-flex flex-direction-column align-items-center justify-content-center p-2" style={{'margin': '0 auto'}}>
                <div>
                    <h1>Spread your ideas with friends in our community</h1>
                    <h3>XureChat lets you connect with the world</h3>
                    <LinkContainer to='/signup'>
                        <Button variant='success'>Get Started</Button>
                    </LinkContainer>
                </div>
            </Col>
            <Col md={7} className="home-gg px-2">
            <Carousel>
            <Carousel.Item>
                <img style={{'maxHeight': '44rem'}}
                className="d-block w-100"
                src={Homeimage1}
                alt="First slide"
                />
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{'maxHeight': '44rem'}}
                className="d-block w-100"
                src={Homeimage2}
                alt="Second slide"
                />
            <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{'maxHeight': '44rem'}}
                className="d-block w-100"
                src={Homeimage3}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
            </Col>
        </Row>

    </div>
  )
}

export default Home