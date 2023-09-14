import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import ReservationForm from '../ReservationForm'
import Help from '../Help'

const styles = {
  link: {
    marginRight: 20,
    marginLeft: 20,
    borderColor: 'red',
    borderWidth: 2,
    textDecoration: 'none',
    color: 'white',
    fontWeight: 500
  },
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    backgroundColor: 'grey',
    borderColor: 'black',
    borderStyle: 'solid',
    marginBottom: 200,
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 150px)',
    width: '100vh'
  },
}

const Navbar = () => {
  return (
    <Router>
      <div style={styles.navBar}>
        <Link style={styles.link} to='/reserve'>Reservation</Link>
        <Link style={styles.link} to='/log-in'>Log in</Link>
        <Link style={styles.link} to='/sign-up'>Sign up</Link>
        <Link style={styles.link} to='/help'>Help</Link>
      </div>
      <div style={styles.centerContent}>
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
