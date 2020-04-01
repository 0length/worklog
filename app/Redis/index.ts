import Redis from 'redis'
const redisClient = Redis.createClient({
    port      : Number(process.env.REDIS_PORT),               // replace with your port
    host      : process.env.REDIS_HOST,        // replace with your hostanme or IP address
    password  : process.env.REDIS_PASSWORD,    // replace with your password
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