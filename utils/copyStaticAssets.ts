import * as fs from 'fs-extra'

try {
  // fs.copySync('src/public/favicon.ico', 'dist/public/favicon.ico')
  // font-awesome
  fs.copy('static_assets/plugins', 'dist/public/plugins', (err: any) => {
    if (err){
        // tslint:disable-next-line: no-console
        console.log('An error occured while copying plugins.')
        return console.error(err)
    }
    // tslint:disable-next-line: no-console
    console.log('Copy completed!')
  })
  fs.copy('static_assets/img', 'dist/public/img', (err: any) => {
    if (err){
        // tslint:disable-next-line: no-console
        console.log('An error occured while copying img.')
        return console.error(err)
    }
    // tslint:disable-next-line: no-console
    console.log('Copy completed!')
  })

  // tslint:disable-next-line: no-console
  console.log('######## static assets copy: OK ########')
} catch (err) {
  console.error('######## static assets copy: ERROR ########', err.message)
}
