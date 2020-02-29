import React, { useState, useEffect } from 'react'
import { Input, Button, Dropzone, TagsInput } from '../../../element'
import { createGlobalStyle } from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { generalGraph, upload, resetUploader } from './../../../../../../reducer/actions'
import withLayout from '../withLayout'


const LocalStyle = createGlobalStyle`
    .wl-work_form {
        padding: 5% 10%;
        background: #FAFAFA;
    }
    .wl-form-group {
        margin-bottom: 2rem;
        label {
            font-family: Poppins,Helvetica,sans-serif;
            text-align: right;
            font-size: 1rem;
            font-weight: 400;
            display: inline-block;
            margin-bottom: .5rem;
        }

        input {
            display: inline;
            background: #fff;
        }
    }
`
const Form: React.FC<any> = (props) =>{
    
    const [name, setName] = useState<string>('')
    const [p, setP] = useState<string>('')
    const [simple_caption, setSimpleCaption] = useState<string>('')
    const [file, setFile] = useState<string>('')
    const [client, SetClient] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [pid, setPid] = useState<string>('')

    
        useEffect(()=>{
            const activityName = props.data?props.instanceOf+'-edit-':props.instanceOf+'-create-'
           if( name ){
               setPid(activityName+name.split(" ").join("-")) 
           } 
        }, [name])

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
        <label>Name : </label>
        {<span style={{color:"#FD27EB", float: 'right', fontFamily: 'Monserat'}} >The Name already in use</span>}
            <Input value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div key={"wl_fr__work-tag"} className="wl-form-group">
            <label>Tag : </label>
            <TagsInput valueGetter={setP}/>
            {/* <Input value={p} onChange={(e)=>setP(e.target.value)}/> */}
        </div>
        <div key={"wl_fr__work-cap"}className="wl-form-group">
            <label>Simple Caption : </label>
            <Input value={simple_caption} onChange={(e)=>setSimpleCaption(e.target.value)} />
        </div>
        <div key={"wl_fr__work-img"} className="wl-form-group">
            <label>File for Image : </label>
            {name && <Dropzone onFilesAdded={props.upload} progress={props.uploader.progress} pid={pid}/>}
        </div>
        <div key={"wl_fr__work-client"} className="wl-form-group">
            <label>Client : </label>
            <Input value={client} onChange={(e)=>SetClient(e.target.value)}/>
        </div>
        <div key={"wl_fr__work-date"} className="wl-form-group">
            <label>Finish Date : </label>
            <Input value={date} onChange={(e)=>setDate(e.target.value)} />
        </div>
        <div key={"wl_fr__work-desc"} className="wl-form-group">
            <label>Long Description : </label>
            <Input value={desc} onChange={(e)=>setDesc(e.target.value)}/>
        </div>
        
        <div key={"wl_fr__work-action"} className="wl-form-group">
        
            <Button onClick={()=>{props.generalGraph(`mutation { createWork(name: "${name}", p: "${p}") { name } } } `)}}>Save</Button>
            &nbsp;
            <Button onClick={()=>{props.setMode('read')}}>Discard</Button>

        </div>
    </div>)
    
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) => bindActionCreators({
    generalGraph,
    upload,
    resetUploader
}, dispatch);

export default withLayout(connect(mapStateToProps, mapDispatchToProps)(Form));