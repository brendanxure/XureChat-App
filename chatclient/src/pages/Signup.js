import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container } from 'react-bootstrap';
import Homeimage4 from '../images/Homeimage4.jpg'
import { Link, useNavigate } from 'react-router-dom';
import robot from '../images/robot.jpg'
import {HiMenuAlt1, HiPencilAlt} from 'react-icons/hi'
import { useSignupUserMutation } from '../services/Api';

const Signup = () => {
const [signupUser, { isLoading, error }] = useSignupUserMutation()
const navigate = useNavigate();

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const [image, setImage] = useState(null)
const [uploadingImg, setUploadingImg] = useState(false)
const [imagePreview, setImagePreview] = useState(null)

const validateimg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
        return alert('Max size is 1mb')
    } else {
        setImage(file);
        setImagePreview(URL.createObjectURL(file))
    }
}

const uploadImage = async() => {
    const data = new FormData()
    data.append('file', image);
    data.append('upload_preset', 'dzenaayf')
    try {
        setUploadingImg(true);
        let res = await fetch('https://api.cloudinary.com/v1_1/brendanxure/image/upload', {
            method: 'post',
            body: data
        })
        const urlData = await res.json();
        setUploadingImg(false);
        return urlData.url
    } catch (error) {
        setUploadingImg(false)
        console.log(error)
    }
}

const handleSignUp = async(e) => {
    e.preventDefault();
    if (!image) return alert('Please upload your profile picture')
    const url = await uploadImage(image)
    console.log(url)

    //signup the user
    signupUser({name, email, password, picture: url}).then(({data}) => {
        if (data) {
            console.log(data);
            navigate('/chat')
        }
    })
}

  return (
    <Container style={{'backgroundColor': 'lightblue', 'marginTop': '2rem', 'borderRadius': '1rem', 'padding': '0rem'}}>
    <Row style={{'--bs-gutter-x': '0rem'}}>
        <Col md={6} sm={12}>
            <div><img style={{'maxHeight': '45rem', 'borderRadius': '1rem'}} src={Homeimage4} /></div>
        </Col>
        <Col md={5} sm={12} style={{'margin': '2rem auto'}}>
        <Form className='d-block align-items-center justify-content-center' style={{'width': '80%', 'margin': '0 auto'}} onSubmit={handleSignUp}>
            <h1 style={{'textAlign':'center'}}>Create an account</h1>
            <div style={{'display': 'flex', 'position': 'relative', 'justifyContent':'center','height': '6rem', 'borderRadius': '50%' }}>
                <img src={imagePreview || robot} style={{'width': '5rem', 'height': '5rem', 'borderRadius': '50%', 'border': '0.3rem solid black'}}/>
                <label htmlFor='pics' style={{'position': 'absolute', 'left':'53%', 'bottom': '15%', }}><HiPencilAlt style={{'width':'2rem', 'height': '2rem'}}/></label>
                <input id='pics' type='file' hidden accept='image/png, image/jpeg, image/jpg' onChange={validateimg}></input>
            </div>
            {error && <p className='alert alert-danger'>{error.data}</p>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your Name" value={name} onChange={(e)=> setName(e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
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
               {uploadingImg || isLoading ? 'Signing you up...' : 'Create account'}
            </Button>
            <div style={{'marginTop': '1rem'}}><h5>Already have an account? <Link to='/login'>Login</Link></h5></div>
        </Form>
        </Col>
        <Col md={7}>
        </Col>
    </Row>
    </Container>
  )
}

export default Signup