const arrayChunks = (array: Array<any> ,chunkSize: number)=> {
      var R = [];
      for (var i = 0; i < array.length; i += chunkSize)
        R.push(array.slice(i, i + chunkSize));
      return R;
    }
export default arrayChunks