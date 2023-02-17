import React, { useContext, useEffect } from 'react'
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AppContext } from '../context/AppContext'
import { getUser } from '../features/Userslice'
import {addNotifications, resetNotifications} from "../features/Userslice"

const Sidebar = () => {
  const user = useSelector(getUser)
  const {socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMember, setPrivateMember, newMessages, setNewMessages, rooms, setRooms} = useContext(AppContext);
  const  dispatch = useDispatch()
  socket.off('new-user').on('new-user', (payload) => {
    console.log(payload)
    setMembers(payload)
  })

  useEffect(()=> {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit('join-room', 'general');
      socket.emit('new-user')
    }
   
  }, [])
  
  const getRooms = ()=> {
    fetch('http://localhost:5001/rooms').then((res)=> res.json()).then((data)=> setRooms(data))
  }

  const joinRoom = (room, isPublic = true) => {
    if(!user) {
      return alert('please login')
    }
    socket.emit('join-room', room, currentRoom);
    setCurrentRoom(room);

    if(isPublic) {
      setPrivateMember(null)
    }
    // dispatch for notifications
    dispatch(resetNotifications(room))

  }

  socket.off("notifications").on("notifications", (room)=>{
    if(currentRoom != room) {
      dispatch(addNotifications(room))
      console.log('done')
    }
  })
  const orderIds = (id1, id2) => {
    if((id1) > id2) {
      return id1 + '-' + id2
    } else {
      return id2 + '-' + id1
    }
  }

  const handlePrivateMember = (member) => {
      setPrivateMember(member)
      const roomId = orderIds(user._id, member._id);
      joinRoom(roomId, false)
  }


 

  if (!user) {
    return <></>;
  }

  return (
    <div>
      {user && <>
        <h2>Available Rooms</h2>
        <ListGroup style={{'width': '80%'}}>
            {rooms.map((eachroom, id) => 
                <ListGroupItem key={id} style={{cursor: 'pointer'}} onClick={()=> joinRoom(eachroom)} active={eachroom === currentRoom}>{eachroom} {currentRoom !== eachroom && <span className='badge rounded-pill bg-primary'>{user.newMessage[eachroom]}</span>}
                </ListGroupItem>
            )}
        </ListGroup>
        <h2>Members</h2>
        <ListGroup style={{'width': '80%'}}>
          {members.map(member => 
            <ListGroup.Item key={member._id} style={{cursor: 'pointer'}} active={member?._id === privateMember?._id} onClick={()=>handlePrivateMember(member)} disabled={member._id == user?._id}>
              <Row>
                <Col style={{display: "flex", gap: '1rem', alignItems: 'center'}}>
                  <Col xs={2}>
                  {member.status === "online" ? <i className='fas fa-circle sidebar-online-status' style={{color : 'green'}}></i> : <i className='fas fa-circle sidebar-offline-status' style={{color : 'grey'}}></i>} 
                  <img src={member.picture} style={{width: 30, height: 30, borderRadius: '50%'}} />
                  </Col>
                  <Col xs={8}>
                  {member._id === user?._id ? 'You' : member.name}
                  </Col>
                  <Col xs={1}>
                    <span className='badge rounded-pill bg-primary'>{user.newMessage[orderIds(member._id, user._id)]}</span>
                  </Col>
                </Col>
              </Row>
            </ListGroup.Item>
            )}
        </ListGroup>
        </> }
    </div>
  )
}

export default Sidebar