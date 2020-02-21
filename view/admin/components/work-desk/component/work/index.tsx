import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGlobalStyle } from 'styled-components';
import { AllMode, Work } from '../../../../../../global-types';
import Table from './Table';
import Form from './Form';

const StyleWork = createGlobalStyle`
        .div-work{
            position: absolute;
            margin-top: 5vh;
            margin-left: 2%;
            margin-right: 2%;
        }

        .table-work {
            font-size: 13px;
            font-weight: 300;
            font-family: Poppins,Helvetica,sans-serif;
            border-collapse: initial !important;
            border-spacing: 0 !important;
            width: 100%;
            border: 1px solid #ebedf2;
        }

        .table-work td, .table-work th{
            padding: 6px;
            font-weight: 500;
            border: 1px solid #ebedf2;
            border-bottom-width: 1px;
            border-left-width: 1px;
            padding: .75rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
            border-left-width: 0;
            box-sizing: content-box;
        }

        .table-work tr:nth-child(even){background-color: #fafbfc;}

        .table-work tr:hover {
            color: #212529;
            background: #FAFBFC;
        }

        .table-work th{
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            color: #212529;
            cursor: pointer;
            position: relative;
            vertical-align: middle;
            border-bottom: 2px solid #ebedf2;
            border-bottom-width: 2px;
            text-transform: capitalize;
        }
        .table-work tr td {
            font-weight: 300;
            color: #595d6e;
            border-top-width: 0px;
            border-bottom-width: 1px;
        }

        .text {
            font-size: 11px;
        }

        .longtext {
            font-size: 8px;
        }

        .tag {
            background: rgba(44, 44, 44, 0.07);
            display: inline-block;
            margin: 5px;
            border-radius: 4px;
            padding: 5px;
            color: #62605a !important;
        }

        .btn-add {
            float: right;
            margin: 1vh 0vw;
        }
    `

const Work: React.FC<any> = (props)=>{

    const [mode, setMode]= useState<string>('read');
    const [selected, setSelected]= useState<any>({});

    const allMode: AllMode = {
        read :    <Table setMode={setMode} data={props.work.uptodate}/>,
        write:    <Form setMode={setMode} />
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