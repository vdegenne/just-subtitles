const express = require('express')
const { readFileSync, writeFileSync } = require('fs')
const glob = require('util').promisify(require('glob'))
const bodyParser = require('body-parser')

const getVideoname = async base => (await glob(`files/${base}/*.mp4`))[0]

const port = 3018
const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/save-subtitles(/*)', async (req, res) => {
  const base = req.params[1]
  writeFileSync(`files/${base}/captions.vtt`, req.body.subtitles)
  res.status(200).end()
})

app.get('/production(/*)?', async (req, res) => {
  const base = req.params[1]
  let content = readFileSync('production.html').toString()
  content = content.replace(/%videopath%/g, await getVideoname(base))
  content = content.replace(/%dirpath%/g, `/files/${base}`)
  res.send(content)
})

app.get('/presentation(/*)?', async (req, res) => {
  const base = req.params[1]
  let content = readFileSync('presentation.html').toString()
  content = content.replace(/%videopath%/g, await getVideoname(base))
  content = content.replace(/%dirpath%/g, `/files/${base}`)
  res.send(content)
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}/production`)
})
