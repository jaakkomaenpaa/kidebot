import Navbar from './components/Navbar'
import Footer from './components/Footer'

const styles = {
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
}

const App = () => {
  return (
    <div>
      <Navbar />
      <Footer />
    </div>
  )
}

export default App
