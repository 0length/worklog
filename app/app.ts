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
import gdrive from './lib/utils/google-drive'
import Admin from '../view/admin/Admin'
import Reducer from '../reducer'
import { getfile } from './GDrive/getfile'
import { postfile } from './GDrive/postfile'
import { createServer } from 'http'
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
const apolloServer = new ApolloServer({ 
    modules: [
        require('./GraphQL/user'),  
        require('./GraphQL/work'),
        require('./GraphQL/menu'),
        require('./GraphQL/group'),
        require('./GraphQL/post'),
        // require('./GraphQL/comment'),
    ],
    
    path:'/graphql',
    context: async ({req}:any) =>{
      if(req && req.headers && req.headers.authorization){
        return {
          token: req.headers.authorization,  
        }
      }return { token: ":(" }
    }
})

app.use('/graphql', csrfProtection, bodyParser.json())
apolloServer.applyMiddleware({app})
app.use('/static', express.static(path.resolve(__dirname, 'public')))
app.get('/admin', csrfProtection, cookieParser(), (req : Request, res : Response)=> {
    const csrf_token = req.csrfToken()
    // res.cookie('XSRF-TOKEN', csrf_token)
// const { name = 'Marvelous Wololo' } = req.query
// const initialState = { initialArticleState, initialTranslateArticleState}
const store = createStore(Reducer, {csrf: { token: csrf_token}})
const componentStream  = ReactDOMServer.renderToNodeStream(React.createElement(Admin, {store}, null))
const preloadedState = store.getState();
  const htmlStart : string = `
  <!doctype html>
    <html>
    <head>
    <meta charset="utf-8">
      <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
      <link href="/static/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
      <link href="/static/plugins/flaticon/css/flaticon.css" rel="stylesheet" type="text/css" />
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
const bodyParserencoded = bodyParser.urlencoded({ extended: true })
app.get("/api/gdrive/*",  (req: Request, res: Response)=>{return gdrive(req, res, getfile)})
app.post("/api/gdrive",
//  csrfProtection,
bodyParserencoded,
 (req: Request, res: Response)=>{return gdrive(req, res, postfile)})


const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);
httpServer.listen({port: 3000}, () =>(
    console.log(`🚀 Server ready at http://localhost:3000`, apolloServer.subscriptionsPath)
))