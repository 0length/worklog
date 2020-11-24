import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { AllMode, Work } from '../../../../../../global-types'
import Table from './Table'
import Form from './Form'
import { Button } from '../../../element'

const StyleWork = createGlobalStyle`
    `

const Work: React.FC<any> = ()=>{

    const activityName = 'Work'
    const [ mode, setMode ]= useState<string>( 'read' )
    const [ selectedItem, setSelectedItem ]= useState<Work>()

    const actionTable = [
        <Button
            key={"wl-work_add"}
            className="btn-add"
            onClick={()=>setMode('create')}>
                <i className={"fa fa-plus"}/>
                Add New Work
        </Button>
    ]

    const actionForm = [
        <Button
            key={"wl-work_back"}
            {...{styleProfile: {danger: true}}}
            className="btn-back"
            onClick={ () => setMode( 'read' ) } >
                <i className={"fa fa-minus"}/>
                Discard
        </Button>
    ]

    const allMode: AllMode = {
        read :  ()=><Table
                    action={actionTable}
                    generic={{setMode, setSelectedItem}}
                    title={"All Work List"}
                    mode="read"
                    instanceOf={activityName}/>,
        create: ()=><Form
                    action={actionForm}
                    generic={{}}
                    mode="create"
                    title={"Create New Work Item"}
                    instanceOf={activityName}/>,
        update: ()=><Form
                    action={actionForm}
                    generic={{old: selectedItem}}
                    mode="update"
                    title={"Create New Work Item"}
                    instanceOf={activityName}/>
    }

    const setModeToDom = (modeWant: string)=>{
        return allMode[modeWant]
    }

    useEffect(()=>{
        setModeToDom(mode)
    }, [mode])

    return (<>
        <div className="div-work">
            <StyleWork />
            { (()=>allMode[ mode ]())() }
        </div>
    </>)
}

export default Work