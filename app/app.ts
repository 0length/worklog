import path from 'path'
import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import csurf from 'csurf'
import { createStore } from 'redux'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import gdrive from './lib/utils/google-drive'
import Admin from '../view/admin/Admin'
import Reducer from '../reducer'
import { getfile } from './GDrive/getfile'
import { postfile } from './GDrive/postfile'
import { createServer } from 'http'
import endPoint from '../lib/const/endpoint'
// import Routes from '../view/portfolio/index'
import { ApolloServer } from 'apollo-server-express'


const app : Application = express()

// if (app.settings.env === 'production') app.disable('verbose errors')
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
app.use(cors())
const apolloServer = new ApolloServer({
    modules: [
        require('./GraphQL/user'),
        require('./GraphQL/work'),
        require('./GraphQL/menu'),
        require('./GraphQL/group'),
        require('./GraphQL/post'),
        // require('./GraphQL/comment'),
    ],
    ...{path: endPoint.GRAPHQL},
    context: async (connectionParams:any) =>{
      const {req}=connectionParams
      if(req && req.headers && req.headers.authorization){
        return {
          token: req.headers.authorization,
        }
      }
      // tslint:disable-next-line: max-line-length
      if(connectionParams && connectionParams.payload && connectionParams.payload && connectionParams.payload.authToken){
        return {
          token: connectionParams.payload.authToken,
        }
      }
      return { token: ":(" }
    },
})

app.use(endPoint.GRAPHQL, csrfProtection, bodyParser.json())
app.use(endPoint.GRAPHQL_PUBLIC, bodyParser.json())
apolloServer.applyMiddleware({app})
app.use('/static', express.static(path.resolve(__dirname, 'public')))
app.get('/admin', csrfProtection, cookieParser(), (req : Request, res : Response)=> {
const CSRF_TOKEN = req.csrfToken()
const store = createStore(Reducer, {csrf: { server:{hostname: process.env.HOSTNAME || 'localhost', port: process.env.PORT || 3000}, token: CSRF_TOKEN, isLoading: false, error: null}})
const componentStream  = ReactDOMServer.renderToNodeStream(React.createElement(Admin, {store}, null))
const preloadedState = store.getState()
const htmlStart : string = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
    <link href="/static/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />      <link href="/static/plugins/flaticon/css/flaticon.css" rel="stylesheet" type="text/css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <script id="willberemoved">window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      )}
    </script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Roboto:300,400,500,600,700" />
  </head>
  <body>
    <div id="root">`
    res.write(htmlStart)
    componentStream.pipe(
      res,
      { end: false }
    )
const htmlEnd: string = `
    </div>
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
app.get(endPoint.GOOGLEDRIVE + "*",  (req: Request, res: Response)=>{return gdrive(req, res, getfile)})
app.post(endPoint.GOOGLEDRIVE,
 csrfProtection,
bodyParserencoded,
 (req: Request, res: Response)=>{return gdrive(req, res, postfile)})

const publicApollo = new ApolloServer({
  modules: [
      require('./GraphQL/public/works'),
  ],
  playground: true
})
publicApollo.applyMiddleware({app, path: endPoint.GRAPHQL_PUBLIC})

const httpServer = createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)
httpServer.listen({port: process.env.PORT||3000}, () =>(
    console.log(`🚀 Server ready at http://${process.env.HOSTNAME+':'+process.env.PORT}`, apolloServer.subscriptionsPath)
))