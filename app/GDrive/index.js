import { async } from 'rxjs/internal/scheduler/async';

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = './app/GDrive/gdrive-token.json'
const credentials_PATH = './app/GDrive/credentials.json'
let allId = []
let drive = ""
let fileid = ""
const gdrive =  async(req, res)=>{
  //for geting
  console.log(req)
  if(req.method === "GET"){
    fileid = req.originalUrl.split("/")[3]
  if(!fileid)res.status(404).send('Not found').end()
  }

  if(req.method === "POST"){
    //foruploading
    var fileMetadata = {
      'name': 'photo.jpg'
    }
    var media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream('./app/GDrive/jpg.jpg')
    }
  }
  var dest = fs.createWriteStream("./image/" + fileid);
  dest.on("finish", async function() {
    console.log("downloaded", fileid);
    await fs.readFile("./image/" +fileid, 
       (err, image)=>{
      res.contentType('image/jpeg');
      res.end(image, 'binary');
    })
    await fs.unlink("./image/" + fileid, ()=>console.log("delete", fileid))
  })

  await fs.readFile(credentials_PATH, (err, content)=>{
      if(err)return console.log('[GDrive Module] Error loading client secret file', err)
      authorize(JSON.parse(content),  listFiles)
  })
  // await console.log(allId)
      // get file


  if(fileid && allId.indexOf(fileid) > -1 && req.method === "GET"){
      await drive.files.get(
        {fileId: fileid, alt: `media`}, {responseType: `stream`}
        ,(err, res) => {
          if (err)return console.log("ERROR", err)
          res.data.on('end', ()=>{
          console.log(`Done`);
          }).on('error', (err)=>{
            console.log("eroor:", err)
          }).pipe(dest)
      })
  }
  if(req.method === "POST"){
        // upload file
      await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          console.log('File Id: ', file.data.id)
          res.end(file.data.id)
        }
      })
     
  }
    
  
    
    const authorize = (credentials, callback)=>{
        const {client_secret, client_id, redirect_uris} = credentials.installed
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]
        )

        fs.readFile(TOKEN_PATH, (err, token)=>{
            if(err) return getAccessToken(oAuth2Client, callback)
            oAuth2Client.setCredentials(JSON.parse(token))
            callback(oAuth2Client)
        })
    }

    const getAccessToken = (oAuth2Client, callback)=>{
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        })
        console.log('Authorize this app by visiting this url:', authUrl)
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question('Enter the code from that page here: ', (code)=>{
            rl.close()
            oAuth2Client.getToken(code, (err, token)=>{
                if(err) return console.error('Error retrieving access token', err)
                oAuth2Client.setCredentials(token)

                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err)=>{
                    if(err)return console.error(err)
                    console.log('Token stored to', TOKEN_PATH)
                })
                callback(oAuth2Client)
            })
        })
    }
// }
async function listFiles(auth) {
    drive = google.drive({version: 'v3', auth});
    await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    }, (err, result) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = result.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
          if(allId.indexOf(file.id) === -1)allId.push(file.id)
        });
      } else {
        console.log('No files found.');
      }
    });





    // upload file
    // var fileMetadata = {
    //     'name': 'photo.jpg'
    //   };
    //   var media = {
    //     mimeType: 'image/jpeg',
    //     body: fs.createReadStream('./app/GDrive/jpg.jpg')
    //   };
    //   await drive.files.create({
    //     resource: fileMetadata,
    //     media: media,
    //     fields: 'id'
    //   }, function (err, file) {
    //     if (err) {
    //       // Handle error
    //       console.error(err);
    //     } else {
    //       console.log('File Id: ', file.data.id);
    //     }
    //   });



  }
}

export default gdrive