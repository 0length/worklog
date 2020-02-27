const {google} = require('googleapis');
import { Request, Response, NextFunction } from 'express'

export const postfile = async (httpReq: Request, httpRes: Response, auth: any)=>{

    const drive = google.drive({version: 'v3', auth});
        // upload file
        console.log("req.file", httpReq)
        // console.log("req", httpReq.body)
        // console.log("req", httpReq)

        const file = await httpReq.on('end', ()=>{
            return httpReq.body
            // return httpReq.busboy.on('file', (fieldname, file, filename)=>file)
        })
        const ct= httpReq.headers["content-type"]
      //   await httpReq.on('end', ()=>{
      //     return httpReq.headers["content-type"]
      //     // return httpReq.busboy.on('file', (fieldname, file, filename)=>file)
      // })
        // console.log(file)
        if(!ct){
          const result = {data: {success: false, id: null},  error: "header for Content-Type is undefine"} 
              httpRes.json(result)
        }
        var fileMetadata = {
            'name': new Date().toLocaleTimeString().split("/").join().split(".").join().split(":").join()+`.${ct && ct.split("/")[1]}`
          };
          var media = {
            mimeType: ct,
            body: file //fs.createReadStream('./app/GDrive/jpg.jpg')
          };
          await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
          }, function (err: any, file: any) {
            if (err) {
              // Handle error
              // console.error(err);
              const result = {data: {success: false, id: null}, error: "Server Bussy"} 
              httpRes.json(result)
            } else {
              // console.log('File Id: ', file.data.id);
              const result = {data: {success: true, id: file.data.id}} 
              httpRes.json(result)
            }
          });

          // setTimeout(()=>{
          //   console.log("req.file", httpReq.body)
          // }, 5000)
    
}