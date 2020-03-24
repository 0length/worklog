import React, { useState, useEffect } from 'react'
import { Input, Button, Dropzone, TagsInput, Textarea, DatePicker } from '../../../element'
import { createGlobalStyle } from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { generalGraph, upload, killUploader } from './../../../../../../reducer/actions'
import withLayout from '../withLayout'
import language from '../../../../../../lib/lang'
import useUploader, { UploaderState } from '../../../../../../lib/hook/useUploader'


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
}
const Form: React.FC<any> = (props) =>{
    const activityName = props.generic && props.generic.old ? props.instanceOf + '-edit-' : props.instanceOf + '-create-'
    const [tag, setTag] = useState<string>('')
    const dispatch = useDispatch()
    const [disabledName, setDisabledName] = useState<boolean>(false)
    const [name, setName] = useState<FormInput>(
        {
            value:props.generic && props.generic.old &&  props.generic.old.name||'',
            isValid: false,
            error: language[props.language.code].form.error.min5char
        }
    )
    const [p, setP] = useState<FormInput>(
        {
            value:props.generic && props.generic.old && props.generic.old.p||'',
            isValid: false,
            error: language[props.language.code].form.error.min5char
        }
    )
    const [caption, setCaption] = useState<FormInput>(
        {
            value:props.generic && props.generic.old && props.generic.old.simple_caption||'',
            isValid: false,
            error: language[props.language.code].form.error.min5char
        }
    )
    //  todo: create custom hook useFileUploaded
    // const [file, setFile] = useState<string>('')
    const [client, setClient] = useState<FormInput>(
        {
            value:props.generic && props.generic.old && props.generic.old.client||'',
            isValid: false,
            error: language[props.language.code].form.error.min5char
        }
    )
    const [date, setDate] = useState<FormInput>(
        {
            value:props.generic && props.generic.old && props.generic.old.completed_at||'1970/01/01',
            isValid: false,
            error: language[props.language.code].form.error.noselected
        }
    )
    const [site, setSite] = useState<FormInput>(
        {
            value:props.generic && props.generic.old && props.generic.old.website||'',
            isValid: false,
            error: language[props.language.code].form.error.noselected
        }
    )

    const [desc, setDesc] = useState<FormInput>(
        {
            value:props.generic && props.generic.old && props.generic.old.long_desc||'',
            isValid: false,
            error: language[props.language.code].form.error.noselected
        }
    )

    const { uploader, setUploader } = useUploader()

        useEffect( () => {
           if( name.value ){
               const uploaderId = activityName + name.value.split(" ").join("-")
            setUploader( {processId: uploaderId} )
           }
        }, [ name.value ] )

        useEffect( () => {
            if( tag ){
             setP( { ...p, value: tag } )
            }
         }, [ tag ])

        const handleOnSubmit = ()=>{
            dispatch(generalGraph(
                `mutation { ${props.generic.mode}Work(${props.generic.mode === 'update'?'where: {name: "'+props.generic.old.name+'"},': '' } name: "${name.value}", p: "${JSON.stringify(p.value).split('"').join("'")}", simple_caption: "${caption.value}", img_url: "${uploader.fileId}", client: "${client.value}", website: "${site.value}", completed_at: "${date.value}", long_desc: "${desc.value}", interisting_count: 0, social_links: "{facebook: '', twitter: '', instagram: ''}") { name } }`
            , activityName))
        }
    return(<div className="wl-work_form">
         <link href="/static/plugins/react-datepicker/css/index.css" rel="stylesheet" type="text/css" />
        <LocalStyle />
        <div key={"wl_fr__work-name"} className="wl-form-group">
        <div className="label"><label>Name  </label><span>:</span></div>
            <Input
                value={name.value}
                style={{fontWeight: 'bold'}}
                onChange={(e)=>setName({...name, value: e.target.value})}
                disabled={disabledName}
            />
            {<div className="wl-invalid__feedback">{name.error}</div>}
        </div>
        <div key={"wl_fr__work-tag"} className="wl-form-group">
            <div className="label"><label>Tags  </label><span>:</span></div>
            <TagsInput
                initValue={JSON.parse(props.generic.old.p)}
                valueGetter={setTag}
                className='input'
            />
        </div>
        <div key={"wl_fr__work-cap"}className="wl-form-group">
            <div className="label"><label>Simple Caption  </label><span>:</span></div>
            <Input
                value={caption.value}
                onChange={(e)=>setCaption( { ...caption, value: e.target.value } ) } 
            />
        </div>
        <div key={"wl_fr__work-img"} className="wl-form-group">
            <div className="label"><label>File for Image  </label><span>:</span></div>
            {name.value && <Dropzone
                        className="input dropzone"
                        onFilesAdded={(a, b)=>{setDisabledName(true); dispatch(upload(a, b))}}
                        progress={uploader.progress}
                        pid={uploader.processId}
                        onFinish={()=>setDisabledName(false)}
                    />
            }
        </div>
        <div key={"wl_fr__work-client"} className="wl-form-group">
            <div className="label"><label>Client  </label><span>:</span></div>
            <Input
                value={client.value}
                onChange={(e)=>setClient({ ...client, value: e.target.value})}
            />
        </div>
        <div key={"wl_fr__work-date"} className="wl-form-group">
            <div className="label"><label>Finish Date  </label><span>:</span></div>
            <DatePicker
                className='input'
                selected={new Date(date.value)}
                onChange={(d: Date)=>setDate({...date, value: d.toISOString().split('T')[0]})}
            />
            {<div className="wl-invalid__feedback">{date.error}</div>}
        </div>
        <div key={"wl_fr__work-desc"} className="wl-form-group">
            <div className="label"><label>Long Description  </label><span>:</span></div>
            <Textarea
                className="input"
                value={desc.value}
                onChange={(e)=>setDesc({...desc, value:  e.target.value})}
            />
        </div>
        <div key={"wl_fr__work-action"} className="wl-form-group">
            <Button onClick={()=>handleOnSubmit()}>Save</Button>
            &nbsp;
        </div>
    </div>)
}
const mapStateToProps = (state:any) => (state)

const mapDispatchToProps = (dispatch:any) => bindActionCreators({
    generalGraph,
}, dispatch)

export default withLayout(connect(mapStateToProps, mapDispatchToProps)(Form))