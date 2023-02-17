import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getUser } from '../features/Userslice'
import { AppContext } from '../context/AppContext'

const Mainchat = () => {
    const [message, setMessage] = useState("");
    const {socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMember, setPrivateMember, newMessages, setNewMessages, rooms, setRooms} = useContext(AppContext)


    const getFormattedDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1+date.getMonth()).toString();

        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : '0' + day;

        return month + "/" + day + "/" + year
    }

    const todayDate = getFormattedDate();
    const user = useSelector(getUser)

    socket.off('room-messages').on('room-messages', (roomMessages)=> {
        console.log(roomMessages)
        setMessages(roomMessages);
    })

    const handleSubmit = (e) =>{
        if(!message) return;
        e.preventDefault()
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()
        const time = today.getHours() + ":" + minutes
        const roomId = currentRoom;
        socket.emit('message-room', roomId, message, user, time, todayDate);
        setMessage("");

    }
    const messageEndRef = useRef(null);
    useEffect(()=> {
        scrollToBottom();
    }, [messages])

    const scrollToBottom =()=>{
        messageEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }

  return (
    <div>
        <div className=''>{!user && <div className='alert alert-danger'>Please Login</div>}</div>
        <div style={{'height': '80vh', 'border': '1px solid lightgray', 'marginBottom': '20px', 'overflowY': 'scroll',}}>
            {user && !privateMember?._id && <div className='alert alert-info'>You are currently in the {currentRoom} group</div> }
            {user && privateMember?._id && <div className='alert alert-info' style={{display: 'flex', flexDirection: "column-reverse", alignItems: 'center'}}>Your conversation with {privateMember.name} <img style={{width: 35, height:35 }} src={privateMember?.picture}/> </div>}
            {user && messages.map(({_id: date, messagesByDate}, idx)=> 
            <div key={idx} style={{padding: '1rem'}} >
                <p className='alert alert-info text-center message-date-indicator'>{date}</p>
                {messagesByDate?.map(({content, time, from: sender}, msgidx) =>
                <div className={sender._id === user._id ? "incoming-message" : "sent-message"} key={msgidx}>
                    <div className='inner-message'>
                    <div className='d-flex align-items-center mb-3'>
                        <img src={sender.picture} style={{width: 35, height: 35, objectFit: 'cover', borderRadius: '50%', marginRight: 10}} />
                        <p>{sender._id == user?._id ? "You" : sender.name}</p>
                    </div>
                    <p>{content}</p>
                    <p className='time'>{time}</p>
                    </div>
                </div>
                )}
            </div>
            )}
            <div ref={messageEndRef} />
        </div>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={11}>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Your Message' value={message} onChange={e => setMessage(e.target.value)} disabled={!user} style={{'width': '100%'}}></Form.Control>
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <Button variant='primary' type='submit' disabled={!user} style={{'width': '100%'}}>send</Button>
                </Col>
            </Row>
        </Form>
    </div>
  )
}

export default Mainchat