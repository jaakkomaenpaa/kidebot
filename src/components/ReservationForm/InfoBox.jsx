
const InfoBox = ({ statusMessage }) => {
  return (
    <div>
      <p>To stop the process, refresh the page</p>
      {statusMessage}
    </div>
  )
}

export default InfoBox
