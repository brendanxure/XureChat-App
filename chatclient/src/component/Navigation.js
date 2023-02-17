import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../images/logo.png'
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useLogoutUserMutation } from '../services/Api';
import { getUser } from '../features/Userslice';

const Navigation = () => {
  const user = useSelector(getUser)
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async (e)=> {
    e.preventDefault();
    //logout logic
    await logoutUser(user);
    // redirect to home page
    window.location.replace("/")

  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand style={{'fontSize': '25'}}><img style={{'height' : '2rem', }} src={logo}/> XureChat</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && 
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            } 
            <LinkContainer to='/chat'>
            <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            {user &&
            <NavDropdown title={ 
              <div><img src={user.picture} style={{width: 30, height: 30, marginRight: 10, objectFit: 'cover', borderRadius: '50%'}} />{user.name}</div>
            } id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <Button variant="danger" onClick={handleLogout} >Logout</Button>
              </NavDropdown.Item>
            </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation