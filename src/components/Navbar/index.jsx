import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import ReservationForm from '../ReservationForm'
import Help from '../Help'

const styles = {
  link: {
    marginRight: 20
  }
}

const Navbar = () => {
  return (
    <Router>
      <div>
        <Link style={styles.link} to='/reserve'>Reservation</Link>
        <Link style={styles.link} to='/log-in'>Log in</Link>
        <Link style={styles.link} to='/sign-up'>Sign up</Link>
        <Link style={styles.link} to='/help'>Help</Link>
      </div>
      <Routes>
        <Route path='/' element={<ReservationForm />} />
        <Route path='/reserve' element={<ReservationForm />} />
        <Route path='/log-in' element={<div>Yet to be implemented</div>} />
        <Route path='/sign-up' element={<div>Yet to be implemented</div>} />
        <Route path='/help' element={<Help />} />
      </Routes>
    </Router>
  )
}

export default Navbar
