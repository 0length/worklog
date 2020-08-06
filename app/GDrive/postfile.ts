import {google} from 'googleapis'
import { Request, Response, NextFunction } from 'express'
import endPoint from '../../lib/const/endpoint'

export const postfile = async (httpReq: Request, httpRes: Response, auth: any)=>{

  const drive = google.drive({version: 'v3', auth})

  // console.log("req.file", httpReq)

  const file = await httpReq.on('end', ()=>{
    return httpReq.body
  })

  const ct= httpReq.headers["content-type"]

  if(!ct){
    const result = {data: {success: false, id: null},  error: "header for Content-Type is undefine"}
        httpRes.json(result)
  }

  const resource = {
    'name': new Date().toString().split("-").join().split("/").join().split(".").join().split(":").join()+`.${ct && ct.split("/")[1]}`,
  }

  // const media = {
  //   mimeType: ct,
  //   body: file
  // }

  await drive.files.create({
    ...resource,
    // media,
    media:{
      mimeType: ct,
      body: file
    },
    fields: 'id'
  }, (err: any, uploaded: any)=> {
    if (err) {
      const result = {data: {success: false, id: null}, error: "Server Bussy"}
      httpRes.json(result)
    } else {
      const result = {data: {success: true, id: uploaded.data.id}, success: true, file: {url: endPoint.GOOGLEDRIVE+uploaded.data.id}}
      httpRes.json(result)
    }
  })

}