require('dotenv').config()

module.exports = {
  "natural-language-understanding": [
    {
      "name": "google-love-rate-natural-la-1521231366661",
      "plan": "free",
      "credentials": {
        "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
        "username": process.env.WATSON_USERNAME,
        "password": process.env.WATSON_PASSWORD
      }
    }
  ]
}