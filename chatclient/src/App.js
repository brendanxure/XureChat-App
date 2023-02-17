import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './component/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import { useState } from 'react';
import { AppContext, socket } from './context/AppContext';

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMember, setPrivateMember ] = useState({});
  const [newMessages, setNewMessages] = useState({})
  return (
    <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMember, setPrivateMember, newMessages, setNewMessages, rooms, setRooms}} >
    <div>
      <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='chat' element={<Chat />} />
      </Routes>
      </BrowserRouter>
    </div>
    </AppContext.Provider>
  );
}

export default App;
