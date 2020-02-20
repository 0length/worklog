import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGlobalStyle } from 'styled-components';
import { Work } from '../../../../../prisma/src/generated/prisma-client';
import { Button } from '../../element';

const Work: React.FC<any> = (props)=>{
const [tbody, setTbody] = useState<Array<JSX.Element>>([<tr></tr>])

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
    `

    useEffect(()=>{
        if(props.work.uptodate){
            let temp: Array<JSX.Element> = []
            props.work.uptodate.map((item: Work, idx: number)=>{
                temp.push( <tr key={"wl_dt__work-tr"+(idx+1)}>
                    <td key={"wl_dt__work-no"+(idx+1)}>{idx+1}</td>
                    <td key={"wl_dt__work-name"+(idx+1)}>{item.name}</td>
                    <td key={"wl_dt__work-p"+(idx+1)}>{item.p}</td>
                    <td key={"wl_dt__work-author"+(idx+1)}>{item.author_name}</td>
                    <td key={"wl_dt__work-cap"+(idx+1)} className="text">{item.simple_caption.substr(0, 50)+'...'}</td>
                    <td key={"wl_dt__work-img"+(idx+1)}><img width="50px" height="auto" src={'/api/gdrive/'+ item.img_url} alt={item.name} /></td>
                    <td key={"wl_dt__work-client"+(idx+1)}>{item.client}</td>
                    <td key={"wl_dt__work-date"+(idx+1)}>{item.completed_at}</td>
                    <td key={"wl_dt__work-desc"+(idx+1)} className="longtext">{item.long_desc.substr(0, 150)+'...'}</td>
                    <td key={"wl_dt__work-like"+(idx+1)}>{item.interisting_count}</td>
                    <td key={"wl_dt__work-act"+(idx+1)}><Button /> <Button /> <Button /></td>
                </tr>)
            })
            setTbody(temp);   
        }
    }, [props.work.uptodate])
    return (<>
        <div className="div-work">
            <StyleWork />
            <table className="table-work">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Tag</th>
                        <th>Author</th>
                        <th>Simple Caption</th>
                        <th>Image</th>
                        <th>Client</th>
                        <th>Finish</th>
                        <th>Description</th>
                        <th>Interesting</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
            </tbody>
            </table>
        </div>
    </>)
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Work);