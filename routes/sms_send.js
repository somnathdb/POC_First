const Gupshup = require('gupshup')

const gupshup = new Gupshup({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET,
  applicationId: NEXMO_APPLICATION_ID,
  privateKey: NEXMO_APPLICATION_PRIVATE_KEY_PATH
})

nexmo.channel.send(
  { "type": "sms", "number": "TO_NUMBER" },
  { "type": "sms", "number": "FROM_NUMBER" },
  {
    "content": {
      "type": "text",
      "text": "This is an SMS sent from the Messages API"
    }
  },
  (err, data) => { console.log(data.message_uuid); }
);