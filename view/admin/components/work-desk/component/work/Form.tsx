import React, { useState } from 'react'
import { Input, Button, Dropzone } from '../../../element'
import { createGlobalStyle } from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { generalGraph, uploader } from './../../../../../../reducer/actions'
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



    return(<div className="wl-work_form">
        <LocalStyle />
        <div className="wl-form-group">
        <label>Name : </label>
            <Input value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="wl-form-group">
            <label>Tag : </label>
            <Input value={p} onChange={(e)=>setP(e.target.value)}/>
        </div>
        <div className="wl-form-group">
            <label>Simple Caption : </label>
            <Input value={simple_caption} onChange={(e)=>setSimpleCaption(e.target.value)} />
        </div>
        <div className="wl-form-group">
            <label>File for Image : </label>
            <Dropzone onFilesAdded={props.uploader} progress={props.upload.progress}/>
        </div>
        <div className="wl-form-group">
            <label>Client : </label>
            <Input value={client} onChange={(e)=>SetClient(e.target.value)}/>
        </div>
        <div className="wl-form-group">
            <label>Finish Date : </label>
            <Input value={date} onChange={(e)=>setDate(e.target.value)}/>
        </div>
        <div className="wl-form-group">
            <label>Long Description : </label>
            <Input value={desc} onChange={(e)=>setDesc(e.target.value)}/>
        </div>
        
        <div className="wl-form-group">
        
            <Button onClick={()=>{props.generalGraph(`mutation { createWork(name: "${name}", p: "${p}") { name } } } `)}}>Save</Button>
            &nbsp;
            <Button onClick={()=>{props.setMode('read')}}>Discard</Button>

        </div>
    </div>)
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) => bindActionCreators({
    generalGraph,
    uploader
}, dispatch);

export default withLayout(connect(mapStateToProps, mapDispatchToProps)(Form));