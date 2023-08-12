const Help = () => {
  return (
    <div>
      <h3>Instructions</h3>
      <p>
        In the Event url field, paste the part of the event&lsquo;s url which
        comes after &lsquo;events/&lsquo;.
      </p>
      <p>
        For example, from the following url the needed part is bolded:
        https://kide.app/events/<strong>xxxx-xxxx-xxxx</strong>
      </p>
      <p>
        The Bearer token field requires your Kide.app authorization token, which
        can be found anywhere from the Kide.app website by:{' '}
        <strong>
          right-click &rarr; Inspect &rarr; Application &rarr; Local Storage
          &rarr; authorization.token.{' '}
        </strong>
        Make sure to copy the whole token (it is long) and paste it without the
        quotation marks.
      </p>
      <p>
        After pasting the required info, press &lsquo;Submit&lsquo; and the
        reserver should start working. The current status of the reservation
        will be shown right below the reservation form.
      </p>
      <p>
        The bot will try to reserve the maximum possible amount of each ticket
        type, but it is currently capped at 10 tickets per type. The tickets
        will appear in your Kide.app shopping cart after a successful response.
      </p>
      <p>
        Note: for now, an access code is required to be able to reserve tickets.
      </p>
    </div>
  )
}

export default Help
