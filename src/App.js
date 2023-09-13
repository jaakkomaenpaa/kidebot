import Navbar from './components/Navbar'

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
    </div>
  )
}

export default App
