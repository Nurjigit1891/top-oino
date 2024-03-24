import React from 'react'
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
          <div className="navbar-title">
          <Link to="/" className="navbar-title">TOP OINO</Link>
          </div>
        <div className="container">
            <div className="navbar">
                <Link to="/">МАТЧИ</Link>
                <Link to="/create-match">СОЗДАТЬ МАТЧ</Link>
                <Link to="/freePlayers">СВОБОДНЫЕ ИГРОКИ</Link>
                <Link to="/FAQ">F.A.Q</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar