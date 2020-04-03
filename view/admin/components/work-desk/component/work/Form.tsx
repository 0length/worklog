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
import { debounceTime, startWith, map, finalize, debounce, distinctUntilChanged, switchMap } from 'rxjs/operators'
import {Observable as Obs} from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import { timer, interval, empty } from 'rxjs'

const Observable: any = Obs
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
    const [name, setName] = useState<FormInput>(
        {
            value:props.generic && props.generic.old &&  props.generic.old.name||'',
            isValid: false,
            error: "",
            rules: 'required|min:3|max:30',
            name: 'name'
        }
    )
    const [p, setP] = useState<any>(
        {
            value:props.generic && props.generic.old && props.generic.old.p||'',
            isValid: false,
            error: __LANG.form.error.min5char,
        }
    )
    const [caption, setCaption] = useState<any>(
        {
            value:props.generic && props.generic.old && props.generic.old.simple_caption||'',
            isValid: false,
            error: __LANG.form.error.min5char
        }
    )
    //  todo: create custom hook useFileUploaded
    // const [file, setFile] = useState<string>('')
    const [client, setClient] = useState<any>(
        {
            value:props.generic && props.generic.old && props.generic.old.client||'',
            isValid: false,
            error: __LANG.form.error.min5char
        }
    )
    const [date, setDate] = useState<any>(
        {
            value:props.generic && props.generic.old && props.generic.old.completed_at||'1970/01/01',
            isValid: false,
            error: __LANG.form.error.noselected
        }
    )
    const [site, setSite] = useState<any>(
        {
            value:props.generic && props.generic.old && props.generic.old.website||'',
            isValid: false,
            error: __LANG.form.error.noselected
        }
    )

    const [desc, setDesc] = useState<any>(
        {
            value:props.generic && props.generic.old && props.generic.old.long_desc||'',
            isValid: false,
            error: __LANG.form.error.noselected
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

    const handleOnDateChange = (d: Date)=>{
        setDate( { ...date, value: d.toISOString().split('T')[0] } )
    }
// const Rx: any = {Observable:{}}
    Observable.fromEventArgs = (eventArgs: any, uniqueId: string) => {
        if (!Observable.fromEventArgs.instances) {
          Observable.fromEventArgs.instances = []
        }
        // If instance is found, it is already listening to events, so no need to return it
        if (Observable.fromEventArgs.instances && !(uniqueId in Observable.fromEventArgs.instances) && event) {
            // console.log(!(uniqueId in Observable.fromEventArgs.instances) ,event)
          Observable.fromEventArgs.instances[uniqueId] =
          Observable.fromEvent(event.target, event.type).pipe(
            startWith(event),
            finalize(() => {
                if(Observable.fromEventArgs.instances){
                    delete Observable.fromEventArgs.instances[uniqueId]
                }
            })
          )
          return Observable.fromEventArgs.instances[uniqueId]
        }
        // Do nothing after inited
        return empty()
      }

    const handleOnChange = (e: any, setState: (newVal: FormInput) => void, oldState: FormInput): void => {
        // if( e && e.target && e.target.value ) {
        //     setState(newState)
        // //     // singleFieldValidation(newState, setState)
        // }
        Observable
        .fromEventArgs(e, 'UniqueKey')
        .pipe(
            debounce(() => timer(400)),
            distinctUntilChanged()
        )
        .subscribe((x: any) => {
            if(x && x.target){
                const newState = {...oldState, value: x.target.value||""}
                singleFieldValidation(newState, setState)
            }
        })
    }

    const singleFieldValidation = (state: FormInput, setState: (newVal: any) => void) => {
        const validation = new Validator({[state.name]: state.value}, {[state.name]: state.rules})
        if(!validation.passes()){
            setState({
                ...state,
                isValid: false,
                error: validation.errors.all()[state.name][0]
            })
        }else{
            setState({
                ...state,
                isValid: true,
                error: ""
            })
        }
    }
    return(<div className="wl-work_form">
        <link href="/static/plugins/react-datepicker/css/index.css" rel="stylesheet" type="text/css" />
        <LocalStyle />
        <div key={"wl_fr__work-name"} className="wl-form-group">
        <div className="label"><label>Name  </label><span>:</span></div>
            <Input
                // value={ name.value }
                style={ { fontWeight: 'bold' } }
                onChange={ (e) => e.target.value && handleOnChange(e, setName, name) }
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
                value={ caption.value }
                onChange={ (e) => setCaption( { ...caption, value: e.target.value } ) }
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
                value={ client.value }
                onChange={ ( e ) => setClient( { ...client, value: e.target.value} ) }
            />
        </div>
        <div key={"wl_fr__work-date"} className="wl-form-group">
            <div className="label"><label>Finish Date  </label><span>:</span></div>
            <DatePicker
                className='input'
                selected={ new Date( date.value ) }
                onChange={ ( d: Date ) => handleOnDateChange( d ) }
            />
            {<div className="wl-invalid__feedback">{date.error}</div>}
        </div>
        <div key={"wl_fr__work-desc"} className="wl-form-group">
            <div className="label"><label>Long Description  </label><span>:</span></div>
            <Textarea
                className="input"
                value={desc.value}
                onChange={ (e)=>setDesc( { ...desc, value:  e.target.value } ) }
            />
        </div>
        <div key={"wl_fr__work-action"} className="wl-form-group">
            <Button onClick={ () => handleOnSubmit() }>Save</Button>
            &nbsp;
        </div>
    </div>)
}

export default withLayout(Form)