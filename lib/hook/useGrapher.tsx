import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from "react-redux"
import { generalGraph, killGrapher } from '../../reducer/actions'

export interface GrpaherPayload {
    method: 'mutation'|'query'|'subscription'|''
    doWhat: string
    varIn?: string
    varOut: string
}

export interface Grapher {
payload: GrpaherPayload
processId: string
status: string
data?: any
}

export interface GrapherState {
    grapher: Grapher
    setGrapher: (overrides: Partial<Grapher>)=>void
}
export const status = {
    send:'send',
    finish: 'finish',
    inProgress: 'inProgress'
}
const useGrapher = (overrides?: Partial<Grapher>): GrapherState=>{
    // const {payload, processId, status} = overrides
    const defaultState: Grapher = {
        payload: {
            method: "",
            varIn: '',
            varOut: '',
            doWhat: ''
        },
        processId: "",
        status: "",
        data: ''
    }
    const dispatch = useDispatch()
    const [ grapher, setG ]  = useState<Grapher>(
        {
            // payload: {...defaultState.payload, ...overrides.payload},
            // processId: overrides.processId||defaultState.processId,
            // status: overrides.status||defaultState.status
            ...defaultState,
            ...overrides
        }
    )
    const setGrapher = (newVal: Partial<Grapher>)=>setG({
        ...grapher,
        ...newVal
    })
    const globalGrapher = useSelector( (state: any) => state.grapher[ grapher.processId ] )
    useEffect(()=>{
        const { method, varIn, varOut, doWhat } = grapher.payload
        if(grapher.status === status.send){
            dispatch(
                generalGraph(
                    `${method}{
                        ${doWhat}${varIn?'('+varIn+')':''}{
                            ${varOut}
                        }
                    }`,
                    grapher.processId
                )
            )
            setGrapher({status: status.inProgress})
        }
    }, [ grapher.status ])

    useEffect(()=>{
        if( globalGrapher){
            setGrapher(
                {
                    ...grapher,
                    status: globalGrapher.data?status.finish:
                            globalGrapher.error?'error: '+globalGrapher.error:
                            globalGrapher.isLoading?status.inProgress:'',
                    data: globalGrapher.data?globalGrapher.data:''
                }
            )
            dispatch( killGrapher( grapher.processId ) )
        }
     }, [ globalGrapher ])

    return { grapher,  setGrapher }
}

export default useGrapher