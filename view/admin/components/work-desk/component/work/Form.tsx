import React, { useState, useEffect } from 'react'
import { Input, Button, Dropzone, TagsInput, Textarea, DatePicker } from '../../../element'
import { createGlobalStyle } from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { generalGraph, upload, resetUploader } from './../../../../../../reducer/actions'
import withLayout from '../withLayout'
import language from '../../../../../../lib/lang'


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

    // Todo: Debounce typeng validate messegae change
    const [name, setName] = useState<FormInput>(
        {
            value:'',
            isValid: false,
            error: language[props.language.code].form.error.min5char
        })

    const [p, setP] = useState<string>('')
    const [caption, setCaption] = useState<string>('')
    const [file, setFile] = useState<string>('')
    const [client, setClient] = useState<string>('')
    const [date, setDate] = useState<FormInput>(
        {
            value:'1970/01/01',
            isValid: false,
            error: language[props.language.code].form.error.noselected
        })
    const [site, setSite] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [pid, setPid] = useState<string>('')

        useEffect(()=>{
            const activityName = props.data?props.instanceOf+'-edit-':props.instanceOf+'-create-'
           if( name.value ){
               setPid(activityName+name.value.split(" ").join("-"))
           }
        }, [name.value])

        useEffect(()=>{
            // console.log
           if( props.uploader && props.uploader[pid] && props.uploader[pid].fileid){
               setFile(props.uploader[pid].fileid)
               props.resetUploader(pid)
           }
        }, [props.uploader[pid]])

        const handleOnSubmit = ()=>{
            props.generalGraph(`
            mutation { createWork(name: "${name.value}", p: "${JSON.stringify(p).split('"').join("'")}", simple_caption: "${caption}", img_url: "${file}", client: "${client}", website: "${site}", completed_at: "${date}", long_desc: "${desc}", interisting_count: 0, social_links: "{facebook: '', twitter: '', instagram: ''}") { name } }
        `)
        }
    return(<div className="wl-work_form">
        <LocalStyle />
        <div key={"wl_fr__work-name"} className="wl-form-group">
        <div className="label"><label>Name  </label><span>:</span></div>
            <Input
                value={name.value}
                style={{fontWeight: 'bold'}}
                onChange={(e)=>setName({...name, value: e.target.value})}
            />
            {<div className="wl-invalid__feedback">{name.error}</div>}
        </div>
        <div key={"wl_fr__work-tag"} className="wl-form-group">
            <div className="label"><label>Tags  </label><span>:</span></div>
            <TagsInput valueGetter={setP} className='input'/>
        </div>
        <div key={"wl_fr__work-cap"}className="wl-form-group">
            <div className="label"><label>Simple Caption  </label><span>:</span></div>
            <Input value={caption} onChange={(e)=>setCaption(e.target.value)} />
        </div>
        <div key={"wl_fr__work-img"} className="wl-form-group">
            <div className="label"><label>File for Image  </label><span>:</span></div>
            {name.value && <Dropzone
                        className="input dropzone"
                        onFilesAdded={props.upload}
                        progress={props.uploader[pid] && props.uploader[pid].progress}
                        pid={pid}
                    />
            }
        </div>
        <div key={"wl_fr__work-client"} className="wl-form-group">
            <div className="label"><label>Client  </label><span>:</span></div>
            <Input value={client} onChange={(e)=>setClient(e.target.value)}/>
        </div>
        <div key={"wl_fr__work-date"} className="wl-form-group">
            <div className="label"><label>Finish Date  </label><span>:</span></div>
            <DatePicker
                className='input'
                selected={new Date(date.value)}
                onChange={(d: Date)=>setDate({value: d.toISOString().split('T')[0], isValid: true, error: ""})}
            />
            {<div className="wl-invalid__feedback">{date.error}</div>}
        </div>
        <div key={"wl_fr__work-desc"} className="wl-form-group">
            <div className="label"><label>Long Description  </label><span>:</span></div>
            <Textarea className="input" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
        </div>
        <div key={"wl_fr__work-action"} className="wl-form-group">
            <Button onClick={()=>handleOnSubmit()}>Save</Button>
            &nbsp;
            <Button onClick={()=>{props.setMode('read')}}>Discard</Button>
        </div>
    </div>)
}
const mapStateToProps = (state:any) => (state)

const mapDispatchToProps = (dispatch:any) => bindActionCreators({
    generalGraph,
    upload,
    resetUploader
}, dispatch)

export default withLayout(connect(mapStateToProps, mapDispatchToProps)(Form))