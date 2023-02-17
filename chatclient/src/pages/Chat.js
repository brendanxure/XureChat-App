import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Mainchat from '../component/Mainchat'
import Sidebar from '../component/Sidebar'

const Chat = () => {
  return (
    <Container style={{'marginTop': '10px'}}>
        <Row style={{'--bs-gutter-x': '0rem'}}>
            <Col md={4}>
                <Sidebar />
            </Col>
            <Col md={8}>
                <Mainchat />
            </Col>
        </Row>
    </Container>
  )
}

export default Chat