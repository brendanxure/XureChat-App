import React, {useContext, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import Homeimage4 from '../images/Homeimage4.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/Api';
import { AppContext } from '../context/AppContext';

const Login = () => {
    const [loginUser, { isLoading, error}] = useLoginUserMutation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {socket} = useContext(AppContext);

    const handleLogin = (e) => {
        e.preventDefault();

        //login logic
        loginUser({email, password}).then(({data})=> {
            if (data) {
                console.log(data)
                //socket should work here
                socket.emit('new-user')
                //navigate to the chat
                navigate('/chat')
            }
        })

    }
   
  return (
    <Container style={{'backgroundColor': 'lightblue', 'marginTop': '2rem', 'borderRadius': '1rem', 'padding': '0rem'}}>
    <Row style={{'--bs-gutter-x': '0rem'}}>
        <Col md={6}>
            <div><img style={{'maxHeight': '45rem', 'borderRadius': '1rem'}} src={Homeimage4} /></div>
        </Col>
        <Col md={5} style={{'margin': '2rem auto'}}>
        <Form className='d-block align-items-center justify-content-center' style={{'width': '80%'}} onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                {error && <p className='alert alert-danger'>{error.data}</p>}
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                {isLoading ? <Spinner animation='grow'/> : 'Login'}
            </Button>
            <div style={{'marginTop': '1rem'}}><h5>Don't have an account? <Link to='/signup'>Signup</Link></h5></div>
        </Form>
        </Col>
        <Col md={7}>
        </Col>
    </Row>
    </Container>
  )
}

export default Login