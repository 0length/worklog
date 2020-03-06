import arrayChunks from './arrayChunks'

test('chunk array with 10 element into 4 element/chunk tobe 3 chunks', ()=>{
    const arr = [1,2,3,4,5,6,7,8,9,10]
    expect( JSON.stringify( arrayChunks( arr, 4 ) ) ).toBe( JSON.stringify([[1,2,3,4],[5,6,7,8],[9,10]]) )
})