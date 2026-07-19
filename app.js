import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const port = process.env.PORT || 4173

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not found')
      return
    }
    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(data)
  })
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0])

  const candidate = path.resolve(path.join(distDir, urlPath))
  const distRoot = path.resolve(distDir)

  if (candidate !== distRoot && !candidate.startsWith(distRoot + path.sep)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end('Bad request')
    return
  }

  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    serveFile(res, candidate)
    return
  }

  serveFile(res, path.join(distDir, 'index.html'))
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Serving dist/ on http://0.0.0.0:${port}/`)
})
