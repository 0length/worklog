import React, { useState, useEffect } from 'react'
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


const LocalStyle = createGlobalStyle`
    .wl-post_form {
        padding: 5% 10%;
        background: #FAFAFA;
    }
    .wl-form-group {
        position: relative;
        margin-bottom: 3rem;
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

        & > input, & > .input, & > .react-datepicker-wrapper > .react-datepicker__input-container > input {
            background: transparent;
            border: none;
            outline: none;
            width: 80%;
            float: right;
            color: #495057;
        }
        & > .input > input {
            background: transparent;
        }
        & > .input.dropzone  {
            width: 80%;
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
        }
    }


    #editor-js{
        color: #495057;
        .ce-block__content{
            margin: revert;
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
    // const [caption, setCaption] = useState<FormInput>(
    //     {
    //         value: getOld('simple_caption')||'',
    //         isValid: false,
    //         error: '',
    //         rules: 'required|min:5|max:500',
    //         name: 'simple_caption'
    //     }
    // )

    //  todo: create custom hook useFileUploaded


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
            value:getOld('published_at')||'1970/01/01',
            isValid: false,
            error: '',
            name: 'published_at',
            rules: ''
        }
    )

    // const [site, setSite] = useState<FormInput>(
    //     {
    //         value: getOld('website')||'',
    //         isValid: false,
    //         error: '',
    //         name: 'website',
    //         rules: ''
    //     }
    // )

    // const [desc, setDesc] = useState<FormInput>(
    //     {
    //         value: getOld('long_desc')||'',
    //         isValid: false,
    //         error: '',
    //         name: 'long_desc',
    //         rules: ''
    //     }
    // )

    const { uploader, setUploader } = useUploader()
    const { grapher, setGrapher } = useGrapher()


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

        const handleOnSubmit = () => {
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
            setTitle((old)=>({...old, value: ""}))
            setP((old)=>({...old, value: ""}))
            setTextContent((old)=>({...old, value: ""}))
            setPublishedAt((old)=>({...old, value: ""}))
        }
    }, [])
    return(<div className="wl-post_form">
        <link href="/static/plugins/react-datepicker/css/index.css" rel="stylesheet" type="text/css" />
        <LocalStyle />
        <div key={"wl_fr__post-title"} className="wl-form-group">
        {/* <div className="label"><label>Title  </label><span>:</span></div> */}
            <Input
                style={ { fontWeight: 'bold' } }
                onChange={ (e: any) => handleOnChange( e, title, setTitle ) }
                disabled={ disabledName }
                placeholder={"Title"}
                className={"wl_fr__post-title__input"}
            />
            { <div className="wl-invalid__feedback">{ title.error }</div> }
        </div>
        <div key={"wl_fr__post-img"} className="wl-form-group">
            {/* <div className="label"><label>File for Image  </label><span>:</span></div> */}
            {
                title.value && <Dropzone
                    className="input dropzone"
                    onFilesAdded={ ( a, b ) => { setDisabledName( true ); dispatch( upload( a, b ) ) } }
                    progress={ uploader.progress }
                    pid={ uploader.processId }
                    onFinish={ () => setDisabledName( false ) }
                    placeholder={"Illustration Image"}
                />
            }
        </div>
        <div key={"wl_fr__post-tag"} className="wl-form-group">
            <TagsInput
                initValue={ props.generic.old && JSON.parse( props.generic.old.p ) || [] }
                valueGetter={ setTag }
                className='input'
                placeholder={"Tag"}
            />
        </div>
        <div key={"wl_fr__post-content-editor"}  className="wl-form-group">
            {typeof window !== 'undefined' ?  <Editor data={text_content.value} onChange={(data)=>setTextContent((old)=>({...old, value: data}))}/> : null }
        </div>
        <div key={"wl_fr__post-date"} className="wl-form-group">
            <DatePicker
                className='input'
                selected={ new Date( published_at.value ) }
                onChange={ ( d: Date ) => handleOnDateChange( d.toString() ) }
            />
            {/* {<div className="wl-invalid__feedback">{published_at.error}</div>} */}
        </div>
        <div key={"wl_fr__post-action"} className="wl-form-group">
            <Button onClick={ () => handleOnSubmit() }>Save</Button>
            &nbsp;
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
            "Pharagraph"
        }
      }
    ],
  }
)

export default withLayout(Form)