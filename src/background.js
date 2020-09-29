'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import axios from 'axios'
import { createServer } from 'http'
import WebSocket from 'ws'
import fs from 'fs'
import {execSync} from 'child_process'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createHttpServer() {
  let server = createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')

    let url = request.url
    switch (url) {
      case '/subscriptions': {
        let data = fs.readFileSync('subscriptions.json.txt', 'utf8')

        response.writeHead(200, 'Content-Type', 'application/json')
        response.end(data)
      }
        break
      case '/subscriptions/add': {
        let body = ''
        request.on('data', chunk => {
          body += chunk
        })
        request.on('end', () => {
          body = JSON.parse(body)
          body.added.app_id = new Date().getTime()
          body.current.push(body.added)
          fs.writeFileSync('subscriptions.json.txt', JSON.stringify(body.current))
          response.writeHead(200, 'Content-Type', 'application/json')
          response.end(JSON.stringify({message: 'Subscription added.'}))
        })
      }
        break
      case '/subscriptions/update': {
        let body = ''
        request.on('data', chunk => {
          body += chunk
        })
        request.on('end', () => {
          body = JSON.parse(body)
          fs.writeFileSync('subscriptions.json.txt', JSON.stringify(body))
          response.writeHead(200, 'Content-Type', 'application/json')
          response.end(JSON.stringify({message: 'Success.'}))
        })
      }
        break
    }
  })

  server.listen(1440, () => console.log('HTTP server running on port 1440'))
}

function createWebSocketServer() {
  let wss = new WebSocket.Server({
    port: 1445,
    perMessageDeflate: {
      zlibDeflateOptions: {
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      clientNoContextTakeover: true,
      serverNoContextTakeover: true,
      serverMaxWindowBits: 10,
      concurrencyLimit: 10,
      threshold: 1024
    }})

  wss.on('connection', async (instance) => {
    let responseData = [], i = 0
    try {
      let data = fs.readFileSync('subscriptions.json.txt', 'utf8')
      let subscriptions = JSON.parse(data)
      for (; i < subscriptions.length; i++) {
        let subs = subscriptions[i]
        let apiResponse = await axios.get(subs.latest_release_github_api)
        subs.latest_version = apiResponse.data.tag_name

        if (subs.latest_version) {
          let stdout = execSync(subs.version_command)
          subs.current_version = stdout.toString().trim()
          responseData[responseData.length] = subs
        }
      }
    } catch (err) {
      // ignore
    }
    instance.send(JSON.stringify(responseData))
  })
}

function createWindow() {
  // Create a HTTP server
  createHttpServer()
  // Create a WebSocket server that checks for latest releases of subscribed apps.
  createWebSocketServer()

  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 1080,
    minHeight: 600,
    title: 'SignalingApp',
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  // Prevent title from being overridden
  win.on('page-title-updated', event => event.preventDefault())
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
