import * as fs from "fs";
import {google} from 'googleapis'
import { Request, Response, NextFunction } from 'express'

export const getfile = async (httpReq: Request, httpRes: Response, auth: any)=>{

    const allId: any = []
    const fileid = httpReq.originalUrl.split("/")[3]
    const drive = google.drive({version: 'v3', auth})
    httpRes.contentType('video/mp4')
    
    await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err: any, result: any) => {
        if (err) return console.log('The API returned an error: ' + err)
            const files = result.data.files
        if (files.length) {
            console.log('Files:')
            files.map((file: any) => {
                console.log(`${file.name} (${file.id})`)
                if(allId.indexOf(file.id) === -1)allId.push(file.id)
            })
        } else {
            console.log('No files found.')
        }
    });

    await drive.files.get(
        {fileId: fileid, alt: `media`}, {responseType: `stream`}
        ,(err: any, res: any) => {
        if (err)return console.log("ERROR", err)
        res.data.on('end', ()=>{
        console.log(`Done`)
        }).on('error', (err: any)=>{
            console.log("eroor:", err)
        }).pipe(httpRes)
    })

}