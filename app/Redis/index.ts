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
  });
  const RedisSetter = (key: string, value: string)=>{
    redisClient.set(key, value, function(err) {
        if (err) { 
        throw err; /* in production, handle errors more gracefully */
        } else {
            redisClient.get('some-key',function(err,value) {
            if (err) {
            throw err;
            } else {
            console.log(value);
            }
        })
        }
    });
  }

  const RedisIncre = (key: string)=>{
    redisClient.incr(key,function(err) {
        if (err) { 
        throw err; /* in production, handle errors more gracefully */
        } else {
            redisClient.get('some-key',function(err,value) {
            if (err) {
            throw err;
            } else {
            console.log(value);
            }
        })
        }
    });
  }
  
export default redisClient