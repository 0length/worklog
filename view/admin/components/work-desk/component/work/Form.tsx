import React, { useState, useEffect } from 'react'
import { Input, Button, Dropzone, TagsInput } from '../../../element'
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
        margin-bottom: 3rem;
        display: flex;
        align-items: center;
        & >.label {
            font-family: Poppins,Helvetica,sans-serif;
            font-size: 1rem;
            font-weight: 400;
            display: inline-block;
            width: 15%;
            &>span {
                float: right;
                padding: 0 7%;
            }
        }

        & > input, & > .input {
            width: 80%;
            float: right;
            background: #fff;
        }
    }
`
const Form: React.FC<any> = (props) =>{

    // rodo: change state type to {value and isValid}
    const [name, setName] = useState<any>({value:'', isValid: false, error: language[props.language.code].form.error.min5char})

    const [p, setP] = useState<string>('')
    const [caption, setCaption] = useState<string>('')
    const [file, setFile] = useState<string>('')
    const [client, SetClient] = useState<string>('')
    const [date, setDate] = useState<string>('')
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

    return(<div className="wl-work_form">
        <LocalStyle />
        <div key={"wl_fr__work-name"} className="wl-form-group">
        <div className="label"><label>Name  </label><span>:</span></div>
        {/* {<span style={{color:"#FD27EB", float: 'right', fontFamily: 'Monserat'}} >The Name already in use</span>} */}
            <Input value={name.value} onChange={(e)=>setName({...name, value: e.target.value})}/>
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
                        className="input"
                        onFilesAdded={props.upload}
                        progress={props.uploader[pid] && props.uploader[pid].progress}
                        pid={pid}
                    />
            }
        </div>
        <div key={"wl_fr__work-client"} className="wl-form-group">
            <div className="label"><label>Client  </label><span>:</span></div>
            
            <Input value={client} onChange={(e)=>SetClient(e.target.value)}/>
        </div>
        <div key={"wl_fr__work-date"} className="wl-form-group">
            <div className="label"><label>Finish Date  </label><span>:</span></div>
            <Input value={date} onChange={(e)=>setDate(e.target.value)} />
        </div>
        <div key={"wl_fr__work-desc"} className="wl-form-group">
            <div className="label"><label>Long Description  </label><span>:</span></div>
            <Input value={desc} onChange={(e)=>setDesc(e.target.value)}/>
        </div>
        <div key={"wl_fr__work-action"} className="wl-form-group">
            <Button onClick={()=>{props.generalGraph(`
                mutation { createWork(name: "${name.value}", p: "${JSON.stringify(p).split('"').join("'")}", simple_caption: "${caption}", img_url: "${file}", client: "${client}", website: "${site}", completed_at: "${date}", long_desc: "${desc}", interisting_count: 0, social_links: "{facebook: '', twitter: '', instagram: ''}") { name } }
            `)}}>Save</Button>
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