import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGlobalStyle } from 'styled-components';
import { AllMode, Work } from '../../../../../../global-types';
import Table from './Table';
import Form from './Form';
import { Button } from '../../../element';

const StyleWork = createGlobalStyle`
    `

const Work: React.FC<any> = (props)=>{
    const [mode, setMode]= useState<string>('read');
    
    const actionTable = [<Button className="btn-add" onClick={()=>setMode('write')}><i className={"fa fa-plus"}/> Add New Work</Button>]
    const actionForm = [<Button {...{styleProfile: {danger: true}}} className="btn-add" onClick={()=>setMode('read')}><i className={"fa fa-minus"}/> Discard </Button>]
    const allMode: AllMode = {
        read :    <Table action={actionTable} data={props.work.uptodate} title={"All Work List"}/>,
        write:    <Form action={actionForm} data={""} title={"Create New Work Item"}/>
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
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Work);