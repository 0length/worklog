import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createGlobalStyle } from 'styled-components'
import { AllMode, Work } from '../../../../../../global-types'
import Table from './Table'
import Form from './Form'
import { Button } from '../../../element'

const StyleWork = createGlobalStyle`
    `

const Work: React.FC<any> = (props)=>{

    const activityName = 'work'
    const [ mode, setMode ]= useState<string>( 'read' )
    const [ selectedItem, setSelectedItem ]= useState<Work>()

    const actionTable = [<Button  key={"wl-work_add"} className="btn-add" onClick={()=>setMode('create')}><i className={"fa fa-plus"}/> Add New Work</Button>]
    const actionForm = [ <Button key={"wl-work_back"}
    {...{styleProfile: {danger: true}}} className="btn-back"
    onClick={ () => setMode( 'read' ) } > <i className={"fa fa-minus"}/> Discard </Button> ]
    const allMode: AllMode = {
        read :  <Table action={actionTable} generic={{setMode: setMode, setSelectedItem: setSelectedItem}} data={props.work.uptodate} title={"All Work List"}/>,
        create: <Form action={actionForm} old={null} title={"Create New Work Item"} instanceOf={activityName}/>,
        update: <Form action={actionForm} generic={{old: selectedItem}} title={"Create New Work Item"} instanceOf={activityName}/>
    }

    const setModeToDom = (modeWant: string, param: string="")=>{
        return allMode[modeWant]
    }

    useEffect(()=>{
        setModeToDom(mode)
    }, [mode])

    return (<>
        <div className="div-work">
            <StyleWork />
            {allMode[mode]}
        </div>
    </>)
}
const mapStateToProps = (state:any) => (state)

const mapDispatchToProps = (dispatch:any) => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Work)