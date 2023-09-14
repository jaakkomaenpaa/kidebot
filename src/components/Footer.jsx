
const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
  },
  text: {
    margin: 10
  },
  line: {
    color: 'black',
    width: '80%'
  }
}

const Footer = () => {

  return (
    <div style={styles.footer}>
      <hr style={styles.line}/>
      <p style={styles.text}>
        v1.3.0
      </p>
      <p style={styles.text}>
        Latest feature: can add a keyword to reservation
      </p>
    </div>
  )
}

export default Footer