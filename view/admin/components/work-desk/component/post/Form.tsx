import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Input, Button, Dropzone, TagsInput, Textarea, DatePicker } from '../../../element'
import { createGlobalStyle } from 'styled-components'
import { useDispatch } from 'react-redux'
import {  upload } from './../../../../../../reducer/actions'
import withLayout from '../withLayout'
import useUploader from '../../../../../../lib/hook/useUploader'
import useGrapher, { status } from '../../../../../../lib/hook/useGrapher'
import { pushToast } from '../../../../../../reducer/toast/action'
import { toastSuccess } from '../../../../../../lib/utils/toastModel'
import { ActivityPageProps } from '../../../../../../global-types'
import useLanguage from '../../../../../../lib/hook/useLanguage'
import Validator  from 'validatorjs'
import { debounce, distinctUntilChanged } from 'rxjs/operators'
import 'rxjs/add/observable/fromEvent'
import { timer } from 'rxjs'
import fromEventArgs from '../../../../../../lib/utils/fromEventArgs'
import Editor from '../../../element/Editor'
import endPoint from '../../../../../../lib/const/endpoint'


const LocalStyle = createGlobalStyle`
    .wl-post_form {
        padding: 2.5% 5%;
    }
    .wl-form-group {
        position: relative;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        & >.label {
            font-family: Poppins,Helvetica,sans-serif;
            font-size: 1rem;
            font-weight: 400;
            display: inline-block;
            width: 17%;
            &>span {
                float: right;
                padding: 0 7%;
            }
        }
        & > input, & > .input, & > .wl_fr__post-title__input {
            background: transparent;
            border: none;
            outline: none;
            width: 80%;
            float: right;
            color: #495057;
        }
        & > .react-datepicker-wrapper {
            width: 100%;
            & > .react-datepicker__input-container {
                width: 100%;
                input
                {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: #495057;
                    width: 100%;
                }
            }
        }

        & > .react-datepicker__tab-loop > .react-datepicker-popper {
            z-index: 2;
        }

        & > .input > input {
            background: transparent;
        }
        & > .input.dropzone  {
            width: 100%;
            color: #495057;
        }
        & > .wl-invalid__feedback {
            position: absolute;
            left: 15%;
            top: 100%;
            width: 82%;
            text-align: right;
        }
        .wl_fr__post-title__input {
            font-size: 46px;
            padding-left:0;
            width: 100%;
        }
    }


    #editor-js{
        color: #495057;
        .ce-block__content, .ce-toolbar__content{
            margin: revert;
            max-width: none;
        }
        .codex-editor__redactor{
            padding-bottom: 100px !important;
        }
        h1 {
            font-size: 42px;
            line-height: 40px;
        }
        
        h2 {
            font-size: 36px;
            line-height: 40px;
        }
        
        h3 {
            font-size: 30px;
            line-height: 40px;
        }
        
        h4 {
            font-size: 26px;
            line-height: 20px;
        }
        
        h5 {
            font-size: 22px;
            line-height: 20px;
        }
        
        h6 {
            font-size: 20px;
            line-height: 20px;
        }
    }
`
export interface FormInput {
    value: string
    isValid: boolean
    error: string
    rules: string
    name: string
}

const Form: React.FC<ActivityPageProps> = (props) =>{
    const activityCode = props.instanceOf +'-'+props.mode+'-'
    const [tag, setTag] = useState<string>('')
    const submitRef = useRef<any>()
    const dispatch = useDispatch()
    const [disabledName, setDisabledName] = useState<boolean>(false)
    const __LANG = useLanguage()
    const getOld = (key: string) => ( props.generic && props.generic.old && props.generic.old[ key ] ) || false
    const [title, setTitle] = useState<FormInput>(
        {
            value:getOld('title')||'',
            isValid: false,
            error: "",
            rules: 'required|min:3|max:100',
            name: 'title'
        }
    )
    const [p, setP] = useState<FormInput>(
        {
            value:getOld('p')||'',
            isValid: false,
            error: "",
            rules:'',
            name: 'p'
        }
    )
    const [text_content, setTextContent] = useState<FormInput>(
        {
            value: getOld('text_content')||DEFAULT_TEXT_CONTENT,
            isValid: false,
            error: '',
            rules: '',
            name: 'text_content'
        }
    )
    const [published_at, setPublishedAt] = useState<FormInput>(
        {
            value:getOld('published_at')||new Date().toString(),
            isValid: false,
            error: '',
            name: 'published_at',
            rules: ''
        }
    )
    const { uploader, setUploader, resetUploader } = useUploader()
    const { grapher, setGrapher } = useGrapher()
    const handleOnSubmit = ()=>{
        // return console.log(title.value);
        
        setGrapher( {
            payload: {
                method: 'mutation',
                doWhat: props.mode + props.instanceOf,
                varIn:
                    `${ props.mode === 'update'?'where: {title: "' + ( props.generic.old && props.generic.old.name ) + '"},' : '' }
                    title: "${ title.value }",
                    p: "${JSON.stringify(p.value).split('"').join("'")}",
                    img_url: "${ uploader.fileId }",
                    text_content: "${ text_content.value.split('"').join("'") }",
                    published_at: "${ published_at.value }",
                    view_count: 0,
                    interisting_count: 0,
                    social_links: "{facebook: '', twitter: '', instagram: ''}"`,
                varOut: 'title'
            },
            status: status.send
        } )
    }

    useEffect( () => {
        if( props.setAction ){
            props.setAction((old)=>{
            return ([
                ...old,
                <Button
                    {...{styleProfile: {primary: true}}}
                    key={"wl-post_save"}
                    onClick={()=>submitRef.current.click()}>
                        <i className="fa fa-save"></i> &nbsp;Save
                </Button>])
            })
        }
     }, [])

        useEffect( () => {
           if( title.value ){
               const pid = activityCode + title.value.split(" ").join("-")
            setUploader( {processId: pid} )
            setGrapher( {processId: pid} )
           }
        }, [ title.value ] )

        useEffect( () => {
            if( tag ){
             setP( { ...p, value: tag } )
            }
         }, [ tag ])

    useEffect(()=>{
        // tslint:disable-next-line: no-unused-expression
        grapher.data && grapher.data.name && dispatch(
                pushToast(
                    [ toastSuccess( grapher.data.name+ " has been "+props.mode+"d " ) ]
                )
            )
    }, [ grapher.data ] )

    const handleOnDateChange = (d: string)=>{
        setPublishedAt( { ...published_at, value: new Date(d).toDateString() } )
    }


    const handleOnChange = ( e: any, oldState: FormInput, setState: ( newVal: FormInput ) => void, ): void => {
        fromEventArgs( e, oldState.name )
        .pipe(
            debounce( () => timer( 400 ) ),
            distinctUntilChanged()
        )
        .subscribe((x: any) => {
            if( x && x.target ){
                // console.log(x)
                const newState = { ...oldState, value: x.target.value }
                singleFieldValidation( newState, setState )
            }
        })
    }

    const singleFieldValidation = ( state: FormInput, setState: ( newVal: any ) => void ) => {
        if(!state.rules){
            const validation = new Validator( { [ state.name ]: state.value }, { [ state.name ]: state.rules } )
            if( !validation.passes( ) ){
                // console.log(validation.errors.all()[ state.name ][ 0 ])
                setState( {
                    ...state,
                    isValid: false,
                    error:  validation.errors.all()[ state.name ][ 0 ]
                } )
            } else {
                setState( {
                    ...state,
                    isValid: true,
                    error: ""
                } )
            }
        }else {
            setState( {
                ...state,
                isValid: true,
                error: ""
            } )
        }
    }

    useEffect(()=>{
        return ()=>{
            // setTitle((old)=>({...old, value: ""}))
            // setP((old)=>({...old, value: ""}))
            // setTextContent((old)=>({...old, value: ""}))
            // setPublishedAt((old)=>({...old, value: ""}))
        }
    }, [])
    return(<div className="wl-post_form">
        <div style={{
            background: '#F6F8FA',
            border: '1px solid #d8e4ef',
            padding: '5% 5%'
        }}
        >
        <link href="/static/plugins/react-datepicker/css/index.css" rel="stylesheet" type="text/css" />
        <LocalStyle />
        <div key={"wl_fr__post-title"} className="wl-form-group">
        {/* <div className="label"><label>Title  </label><span>:</span></div> */}
            <div
                {...{suppressContentEditableWarning: true}}
                style={ { fontWeight: 'bold'} }
                onInput={ (e: any) => {
                    e.persist()
                    setTimeout(() => {
                        setTitle((old)=>({...old, value: e.target.innerText}))
                    }, 100)
                }}
                className={"wl_fr__post-title__input"}
                contentEditable="true"
                // dangerouslySetInnerHTML={{__html: title.value}}
            >Title</div>
            { <div className="wl-invalid__feedback">{ title.error }</div> }
        </div>
        <div key={"wl_fr__post-date"} className="wl-form-group">
            <DatePicker
                className='input'
                selected={ new Date( published_at.value ) }
                onChange={ ( d: Date ) => handleOnDateChange( d.toString() ) }
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            {/* {<div className="wl-invalid__feedback">{published_at.error}</div>} */}
        </div>
    { title.value && <div key={"wl_fr__post-img"} className="wl-form-group">
        {/* <div className="label"><label>File for Image  </label><span>:</span></div> */}
        <Dropzone
                className="input dropzone"
                onFilesAdded={ ( a, b ) => { setDisabledName( true ); dispatch( upload( a, b ) ) } }
                progress={ uploader.progress }
                pid={ uploader.processId }
                onFinish={ () => setDisabledName( false ) }
                onCancel={resetUploader}
                placeholder={"for The Illustration Image"}
                // imgSrc={getOld('img_url')?endPoint.GOOGLEDRIVE+getOld('img_url'):''}
        />
    </div>}
        
        <div key={"wl_fr__post-content-editor"}  className="wl-form-group">
            {typeof window !== 'undefined' ?  <Editor data={text_content.value} onChange={(data)=>setTextContent((old)=>({...old, value: data}))}/> : null }
        </div>
        <div key={"wl_fr__post-tag"} className="wl-form-group">
            <TagsInput
                initValue={ props.generic.old && JSON.parse( props.generic.old.p ) || [] }
                valueGetter={ setTag }
                className='input'
                placeholder={"Tag"}
            />
        </div>
        <div key={"wl_fr__post-action"} className="wl-form-group">
            <Button ref={submitRef} onClick={handleOnSubmit} style={{display: 'none'}}>Save</Button>
            &nbsp;
        </div>
    </div>
    </div>)

}



const DEFAULT_TEXT_CONTENT: string = JSON.stringify({
    blocks: [
      {
        type: "header",
        data: {
          text: "Subtitle",
          level: 2
        }
      },
      {
        type: "paragraph",
        data: {
          text:
            "Paragraph"
        }
      }
    ],
  }
)

export default withLayout(Form)