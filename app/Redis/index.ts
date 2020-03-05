import Redis from 'redis'
const redisClient = Redis.createClient({
    port      : 6379,               // replace with your port
    host      : '192.168.99.100',        // replace with your hostanme or IP address
    password  : 'redispassword',    // replace with your password
    // optional, if using SSL
    // use `fs.readFile[Sync]` or another method to bring these values in
    // tls       : {
    //   key  : stringValueOfKeyFile,
    //   cert : stringValueOfCertFile,
    //   ca   : [ stringValueOfCaCertFile ]
    // }
  })
  const Set = async (key: string, value: string)=>{
    const result = await redisClient.get(key, (error: any, val: any)=> {
      if (error) {
      throw error
      }
      return val
    })
    redisClient.set(key, value, (error: any)=> {
        if (error) {
        throw error /* in production, handle errors more gracefully */
        }
        return result
    })
  }

  const Incre = async (key: string)=>{
    const result = await redisClient.get(key, (err: any,value: any)=>{
      if (err) {
      throw err
      } else {
      return value
      }
  })
    redisClient.incr(key, (err: any)=>{
        if (err) {
        throw err /* in production, handle errors more gracefully */
        }
        return result
    })
  }

  const Cache = {
    Set,
    Incre
  }

export default Cache