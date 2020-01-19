const {google} = require('googleapis');
import { Request, Response, NextFunction } from 'express'
export const postfile = async (httpReq: Request, httpRes: Response, auth: any)=>{

    const drive = google.drive({version: 'v3', auth});
        // upload file
        var fileMetadata = {
            'name': 'photo.jpg'
          };
          var media = {
            mimeType: 'image/jpeg',
            body: httpReq.body //fs.createReadStream('./app/GDrive/jpg.jpg')
          };
          await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
          }, function (err: any, file: any) {
            if (err) {
              // Handle error
              console.error(err);
            } else {
              console.log('File Id: ', file.data.id);
              const result = {data: {success: true, id: file.data.id}} 
              httpRes.json(result)
            }
          });
    
}