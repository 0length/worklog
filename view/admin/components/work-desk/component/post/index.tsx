import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createGlobalStyle } from 'styled-components'
import { AllMode, Work } from '../../../../../../global-types'
import Table from './Table'
import Form from './Form'
import { Button } from '../../../element'

const StylePost = createGlobalStyle`
    `

const Post: React.FC<any> = (props)=>{

    const [mode, setMode]= useState<string>('read')
    const activityName = 'post'
    const actionTable = [<Button  key={"wl-post_add"} className="btn-add" onClick={()=>setMode('write')}><i className={"fa fa-plus"}/> Add New Post</Button>]
    const actionForm = [<Button key={"wl-post_back"}
    {...{styleProfile: {danger: true}}} className="btn-back"
    onClick={()=>setMode('read')}><i className={"fa fa-minus"}/> Discard </Button>]
    const allMode: AllMode = {
        read :    <Table action={actionTable} data={props.post.uptodate} title={"All Post List"}/>,
        write:    <Form action={actionForm} old={null} title={"Create New Post Item"} instanceOf={activityName}/>
    }

    const setModeToDom = (modeWant: string, param: string="")=>{
        return allMode[modeWant]
    }

    useEffect(()=>{
        setModeToDom(mode)
    }, [mode])

    return (<>
        <div className="div-post">
            <StylePost />
            {allMode[mode]}
        </div>
    </>)
}
const mapStateToProps = (state:any) => (state)

const mapDispatchToProps = (dispatch:any) => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Post)