import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './index.css'
import ReservationForm from '../../pages/ReservationForm'
import Help from '../../pages/Help'

const Navbar = () => {
  return (
    <Router>
      <div className='navBar'>
        <Link className='pageLink' to='/reserve'>Reservation</Link>
        <Link className='pageLink' to='/log-in'>Log in</Link>
        <Link className='pageLink' to='/sign-up'>Sign up</Link>
        <Link className='pageLink' to='/help'>Help</Link>
      </div>
      <div className='centerContent'>
        <Routes>
          <Route path='/' element={<ReservationForm />} />
          <Route path='/reserve' element={<ReservationForm />} />
          <Route path='/log-in' element={<div>Yet to be implemented</div>} />
          <Route path='/sign-up' element={<div>Yet to be implemented</div>} />
          <Route path='/help' element={<Help />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Navbar