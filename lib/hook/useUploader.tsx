import { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from "react-redux"
import { killUploader } from '../../reducer/actions'

export interface Uploader{
    fileId: string
    progress: string
    status: string
    processId: string
}
export interface UploaderState{
    uploader: Uploader
    setUploader: (overrides: Partial<Uploader>)=>void
}

const useUploader = ( overrides?: Partial<Uploader> ): UploaderState => {
    const defaultState = {
        fileId:"",
        processId: "",
        progress: "",
        status: ""
    }
    const dispatch = useDispatch()
    const [ uploader, setU ]  = useState<Uploader>(
        {
            ...defaultState,
            ...overrides
        }
    )
    const setUploader = (newVal: Partial<Uploader>)=>setU({
        ...uploader,
        ...newVal
    })
    const globalUploader = useSelector( (state: any) => state.uploader[ uploader.processId ] )
    useEffect( () => {
        if( globalUploader ){

            setUploader(
                {
                    ...uploader,
                    fileId: globalUploader.fileid,
                    progress:  globalUploader.fileid ? '100' : globalUploader.progress,
                    status: globalUploader.fileid ? 'finish' :
                            globalUploader.error ? 'error: ' + globalUploader.error :
                            Number( globalUploader.progress ) < 100 ? 'inProgress' : ''
                }
            )
            // dispatch( killUploader( uploader.processId ) )
        // console.log("Uploader Update",!!globalUploader.fileid);
        }
     }, [ globalUploader, globalUploader ])
     useEffect( () => {
        globalUploader && globalUploader.fileid && console.log("Uploader Update", uploader);
     }, [ uploader, globalUploader ])

     return { uploader,  setUploader }
}
export default useUploader