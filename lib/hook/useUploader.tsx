import React, { useState, useEffect, FunctionComponent } from 'react'
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

const useUploader=(overrides?: Partial<Uploader>): UploaderState=>{
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
    // todo: change this type to uploader reducer if its avaliable
    const globalUploader = useSelector( (state: any) => state.uploader[ uploader.processId ] )
    // useEffect(()=>{
    //     if( uploader.processId ){
    //         globalUploader = useSelector( (state: any) => state.uploader[ uploader.processId ] )
    //     }
    // }, [uploader.processId])

    useEffect(()=>{
        if( globalUploader){
            console.log(globalUploader)
            setUploader(
                {
                    ...uploader,
                    fileId: globalUploader.fileid,
                    progress:  globalUploader.fileid?'100':globalUploader.progress,
                    status: globalUploader.fileid?'finish':globalUploader.error?'Error'+globalUploader.error:''
                }
            )
            dispatch( killUploader( uploader.processId ) )
        }
     }, [ globalUploader ])
     return { uploader,  setUploader }
}
export default useUploader
// const mapStateToProps = (state:any) => (state)

// const mapDispatchToProps = (dispatch:any) => bindActionCreators({
//     generalGraph,
//     upload,
//     killUploader
// }, dispatch)

// export default connect(mapStateToProps, mapDispatchToProps)(useUploader)