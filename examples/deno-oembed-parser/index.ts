import { serve } from 'https://deno.land/std/http/server.ts'

import { Hono } from 'https://deno.land/x/hono/mod.ts'

import { extract } from 'npm:@extractus/oembed-extractor'

const app = new Hono()

const meta = {
  service: 'oembed-parser',
  lang: 'typescript',
  server: 'hono',
  platform: 'deno'
}

app.get('/', async (c) => {
  const url = c.req.query('url')
  if (!url) {
    return c.json(meta)
  }
  try {
    const data = await extract(url)
    return c.json({
      error: 0,
      message: 'oembed data has been extracted successfully',
      data,
      meta
    })
  } catch (err) {
    return c.json({
      error: 1,
      message: err.message,
      data: null,
      meta
    })
  }
})

serve(app.fetch, {
  port: 3101,
  onListen: () => {
    console.log('Server is running at http://localhost:3101')
  }
})
