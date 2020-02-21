import React from 'react'
import { Input, Button } from '../../../element'


const Form: React.FC<any> = (props) =>{
    return(<>
        <label>Name : </label>
        <Input />
        <label>Tag : </label>
        <Input />
        <label>Simple Caption : </label>
        <Input />
        <label>File for Image : </label>
        <Input type="file"/>
        <label>Client : </label>
        <Input />
        <label>Finish Date : </label>
        <Input />
        <label>Long Description : </label>
        <Input />
        <Button>Save</Button>
        <Button>Discard</Button>
    </>)
}

export default Form