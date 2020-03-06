const arrayChunks = (array: any[] ,chunkSize: number)=> {
      const R = []
      for (let i = 0; i < array.length; i += chunkSize)
        R.push(array.slice(i, i + chunkSize))
      return R
    }
export default arrayChunks