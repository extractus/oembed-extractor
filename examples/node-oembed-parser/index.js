import express from 'express'
import { extract } from 'oembed-parser'

const app = express()

const meta = {
  service: 'oembed-parser',
  lang: 'javascript',
  server: 'express',
  platform: 'node'
}

app.get('/', async (req, res) => {
  const url = req.query.url
  if (!url) {
    return res.json(meta)
  }
  try {
    const data = await extract(url)
    return res.json({
      error: 0,
      message: 'article has been extracted successfully',
      data,
      meta
    })
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
      data: null,
      meta
    })
  }
})

app.listen(3101, () => {
  console.log('Server is running at http://localhost:3101')
})
