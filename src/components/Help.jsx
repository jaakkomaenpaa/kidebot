const Help = () => {
  return (
    <div>
      <h3>Instructions</h3>
      <p>
        In the Event url field, paste the part of the event&lsquo;s url which
        comes after &lsquo;events/&lsquo;. For example from the following url
        &lt;https://kide.app/events/<strong>xxxx-xxxx-xxxx</strong>&gt;, the
        bolded part would be needed.
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
        You can also select a ticket index, which means the number of the ticket
        type counted from top to bottom. For example, number 1 corresponds to
        the ticket which is displayed at the top etc. If you choose to select a
        ticket index and it exists, the bot will reserve the maximum amount of
        only that ticket type. However, if the index is invalid or too big, the
        reserver will work as if the index was not given (described under).{' '}
        <strong>This feature is still in testing phase.</strong>
      </p>
      <p>
        After pasting the required info, press &lsquo;Submit&lsquo; and the
        reserver should start working. The current status of the reservation
        will be shown right below the reservation form.
      </p>
      <p>
        The bot will try to reserve the maximum possible amount of each ticket
        type (unless you gave an index), but it is currently capped at 10
        tickets per type. The tickets will appear in your Kide.app shopping cart
        after a successful response.
      </p>
      <p>
        Note: for now, an access code is required to be able to reserve tickets.
      </p>
      <h4>Important</h4>
      <p>
        For some ticket types, the reservation fails. The reason for that is
        unknown, but the events where that behaviour occurs mainly have a large
        amount of ticket types.
      </p>
    </div>
  )
}

export default Help
