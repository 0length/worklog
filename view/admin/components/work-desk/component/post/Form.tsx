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
    const [name, setName] = useState<FormInput>(
        {
            value:getOld('name')||'',
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
    const [caption, setCaption] = useState<FormInput>(
        {
            value: getOld('simple_caption')||'',
            isValid: false,
            error: '',
            rules: 'required|min:5|max:500',
            name: 'simple_caption'
        }
    )
    //  todo: create custom hook useFileUploaded
    // const [file, setFile] = useState<string>('')
    const [client, setClient] = useState<FormInput>(
        {
            value: getOld('client')||'',
            isValid: false,
            error: '',
            rules: '',
            name: 'client'
        }
    )
    const [date, setDate] = useState<FormInput>(
        {
            value:getOld('completed_at')||'1970/01/01',
            isValid: false,
            error: '',
            name: 'completed_at',
            rules: ''
        }
    )
    const [site, setSite] = useState<FormInput>(
        {
            value: getOld('website')||'',
            isValid: false,
            error: '',
            name: 'website',
            rules: ''
        }
    )

    const [desc, setDesc] = useState<FormInput>(
        {
            value: getOld('long_desc')||'',
            isValid: false,
            error: '',
            name: 'long_desc',
            rules: ''
        }
    )

    const { uploader, setUploader } = useUploader()
    const { grapher, setGrapher } = useGrapher()


        useEffect( () => {
           if( name.value ){
               const pid = activityCode + name.value.split(" ").join("-")
            setUploader( {processId: pid} )
            setGrapher( {processId: pid} )
           }
        }, [ name.value ] )

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
                        name: "${ name.value }",
                        p: "${JSON.stringify(p.value).split('"').join("'")}",
                        simple_caption: "${ caption.value }",
                        img_url: "${ uploader.fileId }",
                        client: "${ client.value }",
                        website: "${ site.value }",
                        completed_at: "${ date.value }",
                        long_desc: "${ desc.value }",
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
        setDate( { ...date, value: d.toString() } )
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
        <div className="label"><label>Name  </label><span>:</span></div>
            <Input
                style={ { fontWeight: 'bold' } }
                onChange={ (e: any) => handleOnChange( e, name, setName ) }
                disabled={ disabledName }
            />
            { <div className="wl-invalid__feedback">{ name.error }</div> }
        </div>
        <div key={"wl_fr__work-tag"} className="wl-form-group">
            <div className="label"><label>Tags  </label><span>:</span></div>
            <TagsInput
                initValue={ props.generic.old && JSON.parse( props.generic.old.p ) || [] }
                valueGetter={ setTag }
                className='input'
            />
        </div>
        <div key={"wl_fr__work-cap"}className="wl-form-group">
            <div className="label"><label>Simple Caption  </label><span>:</span></div>
            <Input
                onChange={ (e: any) => handleOnChange( e, caption, setCaption ) }
            />
        </div>
        <div key={"wl_fr__work-img"} className="wl-form-group">
            <div className="label"><label>File for Image  </label><span>:</span></div>
            {
                name.value && <Dropzone
                    className="input dropzone"
                    onFilesAdded={ ( a, b ) => { setDisabledName( true ); dispatch( upload( a, b ) ) } }
                    progress={ uploader.progress }
                    pid={ uploader.processId }
                    onFinish={ () => setDisabledName( false ) }
                />
            }
        </div>
        <div key={"wl_fr__work-client"} className="wl-form-group">
            <div className="label"><label>Client  </label><span>:</span></div>
            <Input
                onChange={ ( e ) => handleOnChange( e, client, setClient ) }
            />
        </div>
        <div key={"wl_fr__work-date"} className="wl-form-group">
            <div className="label"><label>Finish Date  </label><span>:</span></div>
            <DatePicker
                className='input'
                selected={ new Date( date.value ) }
                onChange={ ( d: string ) => handleOnDateChange( d ) }
            />
            {<div className="wl-invalid__feedback">{date.error}</div>}
        </div>
        <div key={"wl_fr__work-desc"} className="wl-form-group">
            <div className="label"><label>Long Description  </label><span>:</span></div>
            <Textarea
                className="input"
                onChange={ (e)=>handleOnChange( e, desc, setDesc ) }
            />
        </div>
        <div key={"wl_fr__work-action"} className="wl-form-group">
            <Button onClick={ () => handleOnSubmit() }>Save</Button>
            &nbsp;
        </div>
    </div>)
}

export default withLayout(Form)