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
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    backgroundColor: 'grey',
    borderColor: 'black',
    borderStyle: 'solid',
    marginBottom: 200,
    width: '100vh'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  }
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
