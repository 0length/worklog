import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { AllMode, Work } from '../../../../../../global-types'
import Table from './Table'
import Form from './Form'
import { Button } from '../../../element'

const StylePost = createGlobalStyle`
    `

const Post: React.FC<any> = (props)=>{

    const activityName = 'Post'
    const [ mode, setMode ]= useState<string>('read')
    const [ selectedItem, setSelectedItem ]= useState<Work>()

    const actionTable = [
        <Button
            key={"wl-post_add"}
            className="btn-add"
            onClick={()=>setMode('create')}>
                <i className={"fa fa-plus"}/>
                Add New Post
        </Button>
    ]

    const actionForm =[
        <Button
            key={"wl-post_back"}
            {...{styleProfile: {danger: true}}}
            className="btn-back"
            onClick={ () => setMode( 'read' ) } >
                <i className={"fa fa-times"}/> &nbsp;Discard
        </Button>
    ]

    const allMode: AllMode = {
        read :  ()=><Table
                    action={actionTable}
                    generic={{setMode, setSelectedItem}}
                    title={"All Post List"}
                    mode="read"
                    instanceOf={activityName}/>,
        create: ()=><Form
                    action={actionForm}
                    generic={{}}
                    mode="create"
                    title={"Create New Post Item"}
                    instanceOf={activityName}/>,
        update: ()=><Form
                    action={actionForm}
                    generic={{old: selectedItem}}
                    mode="update"
                    title={"Edit Current Post Item"}
                    instanceOf={activityName}/>
    }

    const setModeToDom = ( modeWant: string ) => {
        return allMode[ modeWant ]
    }

    useEffect( () => {
        setModeToDom( mode )
    }, [ mode ] )

    return (<>
        <div className="div-post">
            <StylePost />
            { (()=>allMode[ mode ]())() }
        </div>
    </>)
}

export default Post