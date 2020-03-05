import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import readline from 'readline'
import {google} from 'googleapis'
const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = './app/lib/common-keys/googleapis-client/gdrive-token.json'
const CREDENTIALS_PATH = './app/lib/common-keys/googleapis-client/credentials.json'

const gdrive =  async (req: Request, res: Response, callbackFunction: any)=>{

  await fs.readFile(CREDENTIALS_PATH, (err: any, content: any)=>{
    if(err)return console.log('[GDrive Module] Error loading client secret file', err)
    authorize(JSON.parse(content),  callbackFunction)
  })

  const authorize = (credentials: any, callback: any)=>{
      const {client_secret, client_id, redirect_uris} = credentials.installed
      const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]
      )

      fs.readFile(TOKEN_PATH, (err: any, token: any)=>{
        if(err) return getAccessToken(oAuth2Client, callback)
        oAuth2Client.setCredentials(JSON.parse(token))
        callback(req, res, oAuth2Client)
      })
  }

  const getAccessToken = (oAuth2Client: any, callback: any)=>{
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      })
      console.log('Authorize this app by visiting this url:', authUrl)
      const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
      })
      rl.question('Enter the code from that page here: ', (code: any)=>{
          rl.close()
          oAuth2Client.getToken(code, (err: any, token: any)=>{
              if(err) return console.error('Error retrieving access token', err)
              oAuth2Client.setCredentials(token)

              fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any)=>{
                  if(err)return console.error(err)
                  console.log('Token stored to', TOKEN_PATH)
              })
              callback(req, res, oAuth2Client)
          })
      })
  }
}

export default gdrive