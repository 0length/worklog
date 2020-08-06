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
    .wl-work_form {
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

        & > input, & > .input  {
            width: 80%;
            float: right;
            background: #fff;
        }
        & > .input.dropzone  {
            width: 85%;
        }
        & > .wl-invalid__feedback {
            position: absolute;
            left: 15%;
            top: 100%;
            width: 82%;
            text-align: right;
        }
        & > .react-datepicker-wrapper > .react-datepicker__input-container > input{
            display: block;
            width: 100%;
            text-align: center;
            // height: calc(1.5em + 1.3rem + 2px);
            padding: .65rem 1rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #e2e5ec;
            border-radius: 4px;
            -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
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
            name: 'name'
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
            value: getOld('client')||'',
            isValid: false,
            error: '',
            rules: '',
            name: 'client'
        }
    )
    const [published_at, setPublishedAt] = useState<FormInput>(
        {
            value:getOld('completed_at')||'1970/01/01',
            isValid: false,
            error: '',
            name: 'completed_at',
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
                        `${ props.mode === 'update'?'where: {name: "' + ( props.generic.old && props.generic.old.name ) + '"},' : '' }
                        title: "${ title.value }",
                        p: "${JSON.stringify(p.value).split('"').join("'")}",
                        img_url: "${ uploader.fileId }",
                        text_content: "${ text_content.value }",
                        published_at: "${ published_at.value }",
                        view_count: 0,
                        interisting_count: 0,
                        social_links: "{facebook: '', twitter: '', instagram: ''}"`,
                    varOut: 'name'
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
        setPublishedAt( { ...published_at, value: d.split('T')[0] } )
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
    return(<div className="wl-work_form">
        <link href="/static/plugins/react-datepicker/css/index.css" rel="stylesheet" type="text/css" />
        <LocalStyle />
        <div key={"wl_fr__work-name"} className="wl-form-group">
        <div className="label"><label>Title  </label><span>:</span></div>
            <Input
                style={ { fontWeight: 'bold' } }
                onChange={ (e: any) => handleOnChange( e, title, setTitle ) }
                disabled={ disabledName }
            />
            { <div className="wl-invalid__feedback">{ title.error }</div> }
        </div>
        <div key={"wl_fr__work-tag"} className="wl-form-group">
            <div className="label"><label>Tags  </label><span>:</span></div>
            <TagsInput
                initValue={ props.generic.old && JSON.parse( props.generic.old.p ) || [] }
                valueGetter={ setTag }
                className='input'
            />
        </div>
        {/* <div key={"wl_fr__work-cap"}className="wl-form-group">
            <div className="label"><label>Simple Caption  </label><span>:</span></div>
            <Input
                onChange={ (e: any) => handleOnChange( e, caption, setCaption ) }
            />
        </div> */}
        <div key={"wl_fr__work-img"} className="wl-form-group">
            <div className="label"><label>File for Image  </label><span>:</span></div>
            {
                title.value && <Dropzone
                    className="input dropzone"
                    onFilesAdded={ ( a, b ) => { setDisabledName( true ); dispatch( upload( a, b ) ) } }
                    progress={ uploader.progress }
                    pid={ uploader.processId }
                    onFinish={ () => setDisabledName( false ) }
                />
            }
        </div>
        <div key={"wl_fr__work-content-label"} className="wl-form-group">
            <div className="label"><label>Content  </label><span>:</span></div>
            {/* <Input
                onChange={ ( e ) => handleOnChange( e, text_content, setTextContent ) }
            /> */}
        </div>
        <div key={"wl_fr__work-content-editor"}  className="wl-form-group">
            {typeof window !== 'undefined' ?  <Editor data={data} /> : null }
        </div>
        <div key={"wl_fr__work-date"} className="wl-form-group">
            <div className="label"><label>Finish Date  </label><span>:</span></div>
            <DatePicker
                className='input'
                selected={ new Date( published_at.value ) }
                onChange={ ( d: string ) => handleOnDateChange( d ) }
            />
            {<div className="wl-invalid__feedback">{published_at.error}</div>}
        </div>
        {/* <div key={"wl_fr__work-desc"} className="wl-form-group">
            <div className="label"><label>Long Description  </label><span>:</span></div>
            <Textarea
                className="input"
                onChange={ (e)=>handleOnChange( e, desc, setDesc ) }
            />
        </div> */}
        <div key={"wl_fr__work-action"} className="wl-form-group">
            <Button onClick={ () => handleOnSubmit() }>Save</Button>
            &nbsp;
        </div>
    </div>)
}



const data: string = JSON.stringify({
    time: 1556098174501,
    blocks: [
      {
        type: "header",
        data: {
          text: "Editor.js",
          level: 2
        }
      },
      {
        type: "paragraph",
        data: {
          text:
            "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
        }
      },
      {
        type: "header",
        data: {
          text: "Key features",
          level: 3
        }
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "It is a block-styled editor",
            "It returns clean data output in JSON",
            "Designed to be extendable and pluggable with a simple API"
          ]
        }
      },
      {
        type: "header",
        data: {
          text: "What does it mean «block-styled editor»",
          level: 3
        }
      },
      {
        type: "paragraph",
        data: {
          text:
            'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
        }
      },
      {
        type: "paragraph",
        data: {
          text:
            'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
        }
      },
      {
        type: "header",
        data: {
          text: "What does it mean clean data output",
          level: 3
        }
      },
      {
        type: "paragraph",
        data: {
          text:
            "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
        }
      },
      {
        type: "paragraph",
        data: {
          text:
            'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
        }
      },
      {
        type: "paragraph",
        data: {
          text:
            "Clean data is useful to sanitize, validate and process on the backend."
        }
      },
      {
        type: "delimiter",
        data: {}
      },
      {
        type: "paragraph",
        data: {
          text:
            "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
        }
      },
      {
        type: "image",
        data: {
          file: {
            url:
              "https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg"
          },
          caption: "",
          withBorder: true,
          stretched: false,
          withBackground: false
        }
      }
    ],
    version: "2.12.4"
  }
)

export default withLayout(Form)