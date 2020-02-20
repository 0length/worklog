const fs = require('fs-extra')

try {
  // fs.copySync('src/public/favicon.ico', 'dist/public/favicon.ico')
  //font-awesome
  fs.copy('static_assets/plugins', 'dist/public/plugins', function (err) {
    if (err){
        console.log('An error occured while copying plugins.')
        return console.error(err)
    }
    console.log('Copy completed!')
  }); 
  fs.copy('static_assets/img', 'dist/public/img', function (err) {
    if (err){
        console.log('An error occured while copying img.')
        return console.error(err)
    }
    console.log('Copy completed!')
  }); 

  console.log('######## static assets copy: OK ########')
} catch (err) {
  console.error('######## static assets copy: ERROR ########', err.message)
}
