// server

import got from 'got'
import express from 'express'

const app = express()

const loadRemoteEmbed = async (url) => {
  try {
    const headers = {
      'Accept-Charset': 'utf-8'
    }
    const data = await got(url, { headers }).json()
    return data
  } catch (err) {
    return err.message
  }
}

app.get('/proxy/jsonload', async (req, res) => {
  const url = req.query.url
  const json = await loadRemoteEmbed(url)
  return res.json(json)
})

app.use(express.static('public'))

app.listen(3101, () => {
  console.log('Server is running at http://localhost:3101')
})
