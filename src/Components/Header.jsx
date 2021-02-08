import React from 'react'
import { Link } from 'react-router-dom'
import s from '../styles/modules/header.module.scss'

const Header = () => {
  return (
    <div className={s.header}>
      <span>ACITS</span>
      <nav>
        <ul>
          <li>
            <Link to='/today'>Today</Link>
          </li>
          <li>
            <Link to='/animals'>Animals</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header