import path from 'path'
import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import csurf from 'csurf';
import { createStore } from 'redux';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
// import gdrive from './GDrive'
import Admin from '../view/admin/Admin'
import Reducer from '../reducer'
// import Routes from '../view/portfolio/index'
// const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
// const cors = require('cors')
const redis = require('redis')
// const redisClient = redis.createClient()
// const router = express.router();

const app : Application = express();

const csrfProtection = csurf({
    cookie: true
    // {
    //   key: '_csrf',
    //   path: '/graphql',
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 3600 // 1-hour
    // }
})

app.use(cookieParser())
// app.use()
// app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
// app.use(compression())
const server = new ApolloServer({ 
    modules: [
        require('./GraphQL/user'),  
        require('./GraphQL/work')
    ],
    // playground: true,
    path:'/graphql'
})

app.use('/graphql', csrfProtection, bodyParser.json());
server.applyMiddleware({app})
app.use('/static', express.static(path.resolve(__dirname, 'public')))
app.get('/admin', csrfProtection, cookieParser(), (req : Request, res : Response)=> {
    const csrf_token = req.csrfToken()
    // res.cookie('XSRF-TOKEN', csrf_token)
// const { name = 'Marvelous Wololo' } = req.query
// const initialState = { initialArticleState, initialTranslateArticleState}
const store = createStore(Reducer, {csrfReducer: { token: csrf_token}})
const componentStream  = ReactDOMServer.renderToNodeStream(React.createElement(Admin, {store}, null))
const preloadedState = store.getState();
  const htmlStart : string = `
  <!doctype html>
    <html>
    <head>
    <meta charset="utf-8">
      <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <script id="willberemoved">window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      )}</script>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Roboto:300,400,500,600,700">
    </head>
    <body>
    <div id="root">`
  res.write(htmlStart)
  componentStream.pipe(
    res,
    { end: false }
  )
  const htmlEnd: string = `</div>
    <script src="/static/vendors~home.js"></script>
    <script src="/static/home.js"></script>
  </body>
  </html>`
  componentStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

// app.get("/api/gdrive/*",  gdrive)
// app.post("/api/gdrive/*",
//  csrfProtection,
//  gdrive)



app.listen({port: 3000}, () =>(
    console.log(`🚀 Server ready at http://localhost:3000`)
))